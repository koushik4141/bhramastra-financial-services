import { Request, Response } from "express";
import crypto from "crypto";
import prisma from "../utils/prisma";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

// Initialize Razorpay conditionally (fallback to mock flow if keys are placeholders or missing)
let razorpayInstance: any = null;
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (keyId && keySecret && keyId !== "rzp_test_placeholder") {
  try {
    const Razorpay = require("razorpay");
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  } catch (err) {
    console.warn("Razorpay loading error, falling back to Mock integration:", err);
  }
}

export async function createOrder(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?.id;
    const { planTier } = req.body; // BASIC, PRO, ELITE

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!planTier) {
      return res.status(400).json({ error: "Membership plan tier is required" });
    }

    // Retrieve or mock the plan price
    let plan = await prisma.membershipPlan.findUnique({
      where: { tier: planTier },
    });

    if (!plan) {
      // Seed plan dynamically if it doesn't exist
      const planPrices = { BASIC: 999, PRO: 2999, ELITE: 5999 };
      const planNames = { BASIC: "Basic Plan", PRO: "Pro Plan", ELITE: "Elite Plan" };
      
      const features = {
        BASIC: ["Intraday Signals (1-2 daily)", "Telegram Alerts", "Basic Technical Analysis"],
        PRO: ["Intraday + Swing Signals", "Telegram Alerts", "Detailed Stock Reports", "Portfolio Guidance"],
        ELITE: ["All Signals (Intraday, Swing, Positional)", "Telegram + WhatsApp Alerts", "Full Portfolio Management Guidance", "1-on-1 Consultation Call"],
      };

      plan = await prisma.membershipPlan.create({
        data: {
          tier: planTier,
          name: planNames[planTier as keyof typeof planNames],
          price: planPrices[planTier as keyof typeof planPrices],
          durationDays: 30,
          features: features[planTier as keyof typeof features].join(", "),
        },
      });
    }

    const orderAmount = plan.price;
    const orderId = `order_${Math.random().toString(36).substring(2, 15)}`;

    let rzpOrder = null;

    if (razorpayInstance) {
      try {
        rzpOrder = await razorpayInstance.orders.create({
          amount: Math.round(orderAmount * 100), // Amount in paise
          currency: "INR",
          receipt: orderId,
        });
      } catch (err: any) {
        console.error("Razorpay order creation failed, using mock order:", err.message);
      }
    }

    // Save PENDING payment record
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: orderAmount,
        currency: "INR",
        razorpayOrderId: rzpOrder ? rzpOrder.id : orderId,
        status: "PENDING",
      },
    });

    res.status(201).json({
      orderId: payment.razorpayOrderId,
      amount: orderAmount,
      currency: "INR",
      planId: plan.id,
      isMock: !rzpOrder,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create payment order" });
  }
}

export async function verifyPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?.id;
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, planId } = req.body;

    if (!userId || !razorpayOrderId || !planId) {
      return res.status(400).json({ error: "Missing verification parameters" });
    }

    const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });
    if (!plan) {
      return res.status(404).json({ error: "Membership plan not found" });
    }

    let isSignatureValid = false;

    // Verify signature if using real Razorpay
    if (razorpayInstance && razorpaySignature && razorpayPaymentId) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret!)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");

      isSignatureValid = generatedSignature === razorpaySignature;
    } else {
      // Simulated Sandbox Success if credentials are placeholders
      console.warn("Using simulated sandbox payment verification.");
      isSignatureValid = true;
    }

    if (!isSignatureValid) {
      // Mark payment as FAILED
      await prisma.payment.update({
        where: { razorpayOrderId },
        data: { status: "FAILED" },
      });
      return res.status(400).json({ error: "Invalid payment signature verification" });
    }

    // Update payment record to SUCCESS
    await prisma.payment.update({
      where: { razorpayOrderId },
      data: {
        status: "SUCCESS",
        razorpayPaymentId: razorpayPaymentId || `pay_mock_${Math.random().toString(36).substring(2, 10)}`,
      },
    });

    // Create Active Subscription
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.durationDays);

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId,
        startDate,
        endDate,
        status: "ACTIVE",
      },
    });

    // Check referrals bonus
    const referral = await prisma.referral.findFirst({
      where: { referredUserId: userId, bonusPaid: false },
    });

    if (referral) {
      // Mark referral bonus as paid since the referred user subscribed
      await prisma.referral.update({
        where: { id: referral.id },
        data: { bonusPaid: true },
      });
    }

    res.status(200).json({
      message: "Payment verified and subscription activated successfully",
      subscription,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to verify payment" });
  }
}
