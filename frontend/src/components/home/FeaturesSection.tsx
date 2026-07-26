"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Newspaper, Bot, Building2, Activity, ShieldAlert, CalendarClock, Target, FileText } from "lucide-react";

const features = [
  { icon: <Newspaper />, title: "Daily Insights", desc: "Pre-market briefs and post-market institutional summaries." },
  { icon: <Bot />, title: "AI Assisted Research", desc: "Proprietary algorithmic screening for optimal setups." },
  { icon: <Building2 />, title: "Institutional Framework", desc: "Procedures typically reserved for HNI family offices." },
  { icon: <Activity />, title: "Portfolio Tracking", desc: "Real-time tracking of asset allocation and drawdowns." },
  { icon: <ShieldAlert />, title: "Risk Dashboard", desc: "Live visualization of systemic and portfolio-specific risks." },
  { icon: <CalendarClock />, title: "Quarterly Reviews", desc: "In-depth consultation to re-align with changing macro environments." },
  { icon: <Target />, title: "Goal Based", desc: "Mapping specific investments to concrete life events." },
  { icon: <FileText />, title: "Personalized Reports", desc: "Monthly performance tear-sheets tailored to your holdings." },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              The BHRAMASTRA Ecosystem
            </h2>
            <p className="text-brand-grey text-lg">
              Our clients gain access to a comprehensive suite of tools and reports designed to provide complete transparency and control over their wealth.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <GlassCard className="h-full group hover:bg-[#101010]">
                <div className="text-brand-gold mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  {React.cloneElement(f.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">{f.title}</h3>
                <p className="text-brand-grey text-sm">{f.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
