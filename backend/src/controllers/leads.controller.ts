import { Request, Response } from "express";
import prisma from "../utils/prisma";
import nodemailer from "nodemailer";

export async function createLead(req: Request, res: Response) {
  try {
    const { name, email, phone, service, message, preferredDateTime } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields: name, email, message" });
    }

    const lead = await prisma.contactLead.create({
      data: {
        name,
        email,
        phone: phone || "",
        service: service || "General Stock Market Consultation",
        message,
        preferredDateTime: preferredDateTime || null,
      },
    });

    // Optional email notification using Resend/Nodemailer mock
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: "ethereal_placeholder@ethereal.email",
          pass: "ethereal_password",
        },
      });

      // Simple alert email trigger template
      transporter.sendMail({
        from: '"Brahmastra System" <system@brahmastra.com>',
        to: "admin@brahmastra.com",
        subject: `🔥 New Consultation Lead: ${lead.name}`,
        text: `Name: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nService Interest: ${lead.service}\nMessage: ${lead.message}`,
      }).catch((e) => console.error("Email send warning:", e));
    } catch (mailError) {
      console.error("Email configuration missing/invalid:", mailError);
    }

    res.status(201).json({ message: "Thank you for contacting us. Our specialists will call you shortly.", lead });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to submit consultation lead" });
  }
}

export async function getLeads(req: Request, res: Response) {
  try {
    const leads = await prisma.contactLead.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(leads);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch leads" });
  }
}

export async function markLeadAsRead(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const lead = await prisma.contactLead.update({
      where: { id },
      data: { isRead: true },
    });
    res.status(200).json(lead);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update lead status" });
  }
}

export async function deleteLead(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.contactLead.delete({ where: { id } });
    res.status(200).json({ message: "Lead removed successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete lead" });
  }
}
