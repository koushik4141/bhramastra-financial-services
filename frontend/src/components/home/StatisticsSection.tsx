"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

const stats = [
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Clients Served", value: 5000, suffix: "+" },
  { label: "Research Reports", value: 1200, suffix: "+" },
  { label: "Assets Guided", value: 500, prefix: "₹", suffix: "Cr+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
];

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = (duration / end) * 5;
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return (
    <span ref={ref} className="font-numbers font-bold text-4xl lg:text-5xl text-brand-gold">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function StatisticsSection() {
  return (
    <section className="py-24 relative z-20 -mt-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="flex flex-col items-center justify-center text-center p-8 h-full border-t border-brand-gold/20">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <span className="text-brand-grey text-sm font-heading mt-2 uppercase tracking-wider">{stat.label}</span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
