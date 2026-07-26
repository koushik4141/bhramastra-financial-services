"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  CalendarCheck, 
  FileText, 
  BarChart2, 
  Settings, 
  LogOut,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Users" },
  { icon: CreditCard, label: "Plans" },
  { icon: CalendarCheck, label: "Appointments" },
  { icon: FileText, label: "News" },
  { icon: BarChart2, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0A0F1A] border-r border-white/5 h-screen flex flex-col sticky top-0">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 rounded bg-brand-green/10 flex items-center justify-center mr-3 border border-brand-green/20 hover:bg-brand-green/20 transition-colors">
            <span className="font-heading font-bold text-brand-green text-sm">B</span>
          </div>
          <span className="font-heading text-sm tracking-widest text-white uppercase font-semibold hover:text-brand-saffron transition-colors">
            ADMIN PANEL
          </span>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-6 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-body ${
                item.active 
                  ? "bg-brand-green/10 text-brand-green font-medium" 
                  : "text-brand-grey hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout & Back */}
      <div className="p-4 border-t border-white/5 flex flex-col gap-2">
        <Link 
          href="/"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-brand-grey hover:bg-white/5 hover:text-white transition-all text-sm font-body"
        >
          <ArrowLeft size={18} />
          Back to Website
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-all text-sm font-body">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
