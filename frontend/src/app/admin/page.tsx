import React from "react";
import DashboardWidgets from "@/components/admin/DashboardWidgets";
import DashboardCharts from "@/components/admin/DashboardCharts";
import DashboardTables from "@/components/admin/DashboardTables";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Overview</h1>
          <p className="text-brand-grey text-sm">Monitor your platform's performance and leads.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 rounded-lg bg-brand-green text-background text-sm font-medium hover:bg-brand-green-light transition-colors shadow-[0_0_15px_rgba(0,230,118,0.3)]">
            Add New User
          </button>
        </div>
      </div>

      {/* Widgets */}
      <DashboardWidgets />

      {/* Charts */}
      <DashboardCharts />

      {/* Tables */}
      <DashboardTables />
    </div>
  );
}
