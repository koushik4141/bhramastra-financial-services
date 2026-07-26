"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLead = createLead;
exports.getLeads = getLeads;
exports.markLeadAsRead = markLeadAsRead;
exports.deleteLead = deleteLead;
const prisma_1 = __importDefault(require("../utils/prisma"));
const nodemailer_1 = __importDefault(require("nodemailer"));
async function createLead(req, res) {
    try {
        const { name, email, phone, service, message, preferredDateTime } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Missing required fields: name, email, message" });
        }
        const lead = await prisma_1.default.contactLead.create({
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
            const transporter = nodemailer_1.default.createTransport({
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
        }
        catch (mailError) {
            console.error("Email configuration missing/invalid:", mailError);
        }
        res.status(201).json({ message: "Thank you for contacting us. Our specialists will call you shortly.", lead });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to submit consultation lead" });
    }
}
async function getLeads(req, res) {
    try {
        const leads = await prisma_1.default.contactLead.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json(leads);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch leads" });
    }
}
async function markLeadAsRead(req, res) {
    try {
        const { id } = req.params;
        const lead = await prisma_1.default.contactLead.update({
            where: { id },
            data: { isRead: true },
        });
        res.status(200).json(lead);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to update lead status" });
    }
}
async function deleteLead(req, res) {
    try {
        const { id } = req.params;
        await prisma_1.default.contactLead.delete({ where: { id } });
        res.status(200).json({ message: "Lead removed successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to delete lead" });
    }
}
