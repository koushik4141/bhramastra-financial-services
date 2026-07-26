"use client";

import React, { useEffect, useState } from "react";

export default function DashboardCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-96 bg-[#0A0F1A] border border-white/5 rounded-xl animate-pulse" />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Chart 1 placeholder */}
      <div className="bg-[#0A0F1A] border border-white/5 rounded-xl p-6 h-96 flex flex-col">
        <div className="mb-6">
          <h3 className="font-heading text-lg text-white">Lead Generation Trend</h3>
          <p className="text-brand-grey text-xs">Monthly performance across all channels</p>
        </div>
        <div className="flex-1 border border-white/5 rounded-lg flex items-center justify-center relative overflow-hidden bg-[#050505]">
          {/* Simple CSS bar chart visualization */}
          <div className="absolute inset-0 flex items-end justify-between px-8 pt-10 pb-6 gap-2">
            {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
              <div key={i} className="w-full bg-white/5 rounded-t-sm relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-brand-green/80 rounded-t-sm transition-all duration-1000 ease-out"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 2 placeholder */}
      <div className="bg-[#0A0F1A] border border-white/5 rounded-xl p-6 h-96 flex flex-col">
        <div className="mb-6">
          <h3 className="font-heading text-lg text-white">Conversion Sources</h3>
          <p className="text-brand-grey text-xs">Where are clients coming from?</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-48 h-48 rounded-full border-8 border-brand-green/20">
            {/* Simple CSS donut chart representation */}
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <path
                className="text-brand-green"
                strokeDasharray="60, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="text-brand-gold"
                strokeDasharray="25, 100"
                strokeDashoffset="-60"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-white">60%</span>
              <span className="text-[10px] text-brand-grey uppercase">Organic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
