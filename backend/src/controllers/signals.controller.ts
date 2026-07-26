import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import prisma from "../utils/prisma";

// Helper to check if a user has an active membership subscription
async function hasActiveSubscription(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscriptions: {
        where: {
          status: "ACTIVE",
          endDate: { gte: new Date() },
        },
      },
    },
  });
  return (user?.subscriptions.length || 0) > 0 || user?.role === "ADMIN";
}

export async function getSignals(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?.id;
    const isSubscribed = userId ? await hasActiveSubscription(userId) : false;

    const signals = await prisma.tradingSignal.findMany({
      orderBy: { postedAt: "desc" },
    });

    // Mask sensitive details for non-subscribed users to encourage conversions
    const processedSignals = signals.map((sig: any) => {
      if (isSubscribed) {
        return sig;
      }
      return {
        id: sig.id,
        symbol: sig.symbol,
        type: sig.type,
        status: sig.status,
        postedAt: sig.postedAt,
        notes: sig.notes,
        entryPrice: "LOCKED (Join Premium)",
        target1: "LOCKED (Join Premium)",
        target2: sig.target2 ? "LOCKED (Join Premium)" : null,
        stopLoss: "LOCKED (Join Premium)",
        isMasked: true,
      };
    });

    res.status(200).json(processedSignals);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch signals" });
  }
}

export async function createSignal(req: AuthenticatedRequest, res: Response) {
  try {
    const { symbol, type, entryPrice, target1, target2, stopLoss, notes } = req.body;

    if (!symbol || !type || !entryPrice || !target1 || !stopLoss) {
      return res.status(400).json({ error: "Missing required signal parameters" });
    }

    const signal = await prisma.tradingSignal.create({
      data: {
        symbol: symbol.toUpperCase(),
        type,
        entryPrice: parseFloat(entryPrice),
        target1: parseFloat(target1),
        target2: target2 ? parseFloat(target2) : null,
        stopLoss: parseFloat(stopLoss),
        notes,
      },
    });

    // Optional: Send alert to Telegram if integration configured
    try {
      const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (telegramToken && chatId && telegramToken !== "bot_token_placeholder") {
        const message = `🎯 *NEW TRADING SIGNAL* 🎯\n\n*Symbol*: ${signal.symbol}\n*Type*: ${signal.type}\n*Entry*: ₹${signal.entryPrice}\n*Target 1*: ₹${signal.target1}\n*Stop Loss*: ₹${signal.stopLoss}\n\n*Disclaimer*: Stock trading involves risks. Research before investing.`;
        // We do a fire-and-forget fetch to avoid blocking the API response
        fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
        }).catch((err) => console.error("Telegram send error:", err));
      }
    } catch (telegramErr) {
      console.error("Failed to notify Telegram channel:", telegramErr);
    }

    res.status(201).json(signal);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create signal" });
  }
}

export async function updateSignal(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    const { status, entryPrice, target1, target2, stopLoss, notes } = req.body;

    const data: any = {};
    if (status) data.status = status;
    if (entryPrice) data.entryPrice = parseFloat(entryPrice);
    if (target1) data.target1 = parseFloat(target1);
    if (target2 !== undefined) data.target2 = target2 ? parseFloat(target2) : null;
    if (stopLoss) data.stopLoss = parseFloat(stopLoss);
    if (notes !== undefined) data.notes = notes;

    const updated = await prisma.tradingSignal.update({
      where: { id },
      data,
    });

    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update signal" });
  }
}

export async function deleteSignal(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    await prisma.tradingSignal.delete({ where: { id } });
    res.status(200).json({ message: "Signal deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete signal" });
  }
}
