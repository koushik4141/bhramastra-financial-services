import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import { Bell, Search } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | BHRAMASTRA Trading Advisory",
  description: "Internal admin portal",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center bg-white/5 rounded-lg px-4 py-2 w-96 border border-white/10 focus-within:border-brand-primary/50 transition-colors">
            <Search size={18} className="text-brand-grey mr-3" />
            <input
              type="text"
              placeholder="Search users, plans..."
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-brand-grey"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-brand-grey hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-primary"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-heading text-sm border border-brand-primary/30">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Admin User</span>
                <span className="text-[10px] text-brand-grey uppercase">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
