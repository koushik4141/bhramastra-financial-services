"use client";

import React from "react";
import { Users, UserPlus, PhoneCall, TrendingUp } from "lucide-react";

const widgets = [
  {
    title: "Total Visitors",
    value: "24,592",
    change: "+12.5%",
    positive: true,
    icon: Users,
  },
  {
    title: "Active Leads",
    value: "1,245",
    change: "+8.2%",
    positive: true,
    icon: UserPlus,
  },
  {
    title: "Consultations",
    value: "156",
    change: "+24.1%",
    positive: true,
    icon: PhoneCall,
  },
  {
    title: "Monthly Revenue",
    value: "₹8.4L",
    change: "+15.3%",
    positive: true,
    icon: TrendingUp,
  },
];

export default function DashboardWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {widgets.map((widget) => {
        const Icon = widget.icon;
        return (
          <div key={widget.title} className="bg-background-secondary border border-white/5 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-brand-secondary/10 flex items-center justify-center">
                <Icon size={20} className="text-brand-secondary" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded bg-brand-secondary/10 text-brand-secondary`}>
                {widget.change}
              </span>
            </div>
            <div>
              <h4 className="text-brand-grey text-xs tracking-wider uppercase mb-1 font-body">{widget.title}</h4>
              <h2 className="text-2xl font-heading font-bold text-white">{widget.value}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
