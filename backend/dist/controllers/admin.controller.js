"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = getDashboardMetrics;
exports.getUsers = getUsers;
exports.updateUserRole = updateUserRole;
const prisma_1 = __importDefault(require("../utils/prisma"));
async function getDashboardMetrics(req, res) {
    try {
        const totalUsers = await prisma_1.default.user.count();
        const totalLeads = await prisma_1.default.contactLead.count();
        const pendingLeads = await prisma_1.default.contactLead.count({ where: { isRead: false } });
        const activeSubscriptions = await prisma_1.default.subscription.count({
            where: {
                status: "ACTIVE",
                endDate: { gte: new Date() },
            },
        });
        const successfulPayments = await prisma_1.default.payment.findMany({
            where: { status: "SUCCESS" },
        });
        const totalRevenue = successfulPayments.reduce((acc, pay) => acc + pay.amount, 0);
        // Dynamic signals count
        const activeSignals = await prisma_1.default.tradingSignal.count({
            where: { status: "ACTIVE" },
        });
        // Simple revenue tracking details for charts (grouped by date)
        const payments = await prisma_1.default.payment.findMany({
            where: { status: "SUCCESS" },
            orderBy: { createdAt: "asc" },
            select: { amount: true, createdAt: true },
        });
        // Grouping payments by date (YYYY-MM-DD) for frontend charts
        const revenueByDate = {};
        payments.forEach((p) => {
            const dateStr = p.createdAt.toISOString().split("T")[0];
            revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + p.amount;
        });
        const chartData = Object.keys(revenueByDate).map((date) => ({
            date,
            revenue: revenueByDate[date],
        }));
        res.status(200).json({
            metrics: {
                totalUsers,
                totalLeads,
                pendingLeads,
                activeSubscriptions,
                activeSignals,
                totalRevenue,
            },
            chartData,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch admin metrics" });
    }
}
async function getUsers(req, res) {
    try {
        const users = await prisma_1.default.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                subscriptions: {
                    orderBy: { startDate: "desc" },
                    take: 1,
                    include: { plan: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch users" });
    }
}
async function updateUserRole(req, res) {
    try {
        const { id } = req.params;
        const { role } = req.body; // USER, ADMIN
        if (role !== "USER" && role !== "ADMIN") {
            return res.status(400).json({ error: "Invalid role value" });
        }
        const updated = await prisma_1.default.user.update({
            where: { id },
            data: { role },
        });
        res.status(200).json({
            message: `User role updated to ${role} successfully`,
            user: {
                id: updated.id,
                email: updated.email,
                role: updated.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to update user role" });
    }
}
