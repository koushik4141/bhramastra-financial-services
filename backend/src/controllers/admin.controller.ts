import { Request, Response } from "express";
import prisma from "../utils/prisma";

export async function getDashboardMetrics(req: Request, res: Response) {
  try {
    const totalUsers = await prisma.user.count();
    
    const totalLeads = await prisma.contactLead.count();
    const pendingLeads = await prisma.contactLead.count({ where: { isRead: false } });

    const activeSubscriptions = await prisma.subscription.count({
      where: {
        status: "ACTIVE",
        endDate: { gte: new Date() },
      },
    });

    const successfulPayments = await prisma.payment.findMany({
      where: { status: "SUCCESS" },
    });

    const totalRevenue = successfulPayments.reduce((acc: number, pay: any) => acc + pay.amount, 0);

    // Dynamic signals count
    const activeSignals = await prisma.tradingSignal.count({
      where: { status: "ACTIVE" },
    });

    // Simple revenue tracking details for charts (grouped by date)
    const payments = await prisma.payment.findMany({
      where: { status: "SUCCESS" },
      orderBy: { createdAt: "asc" },
      select: { amount: true, createdAt: true },
    });

    // Grouping payments by date (YYYY-MM-DD) for frontend charts
    const revenueByDate: { [key: string]: number } = {};
    payments.forEach((p: any) => {
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
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch admin metrics" });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
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
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch users" });
  }
}

export async function updateUserRole(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { role } = req.body; // USER, ADMIN

    if (role !== "USER" && role !== "ADMIN") {
      return res.status(400).json({ error: "Invalid role value" });
    }

    const updated = await prisma.user.update({
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
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update user role" });
  }
}
