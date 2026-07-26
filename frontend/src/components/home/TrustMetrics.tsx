"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Users, FileText, TrendingUp } from "lucide-react";

const metrics = [
  {
    icon: Shield,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    accent: "gold" as const,
  },
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Happy Clients",
    accent: "green" as const,
  },
  {
    icon: FileText,
    value: 1500,
    suffix: "+",
    label: "Research Reports",
    accent: "gold" as const,
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    accent: "green" as const,
  },
];

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      const stepTime = duration / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function TrustMetrics() {
  return (
    <section className="relative z-20 -mt-4">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const isGold = metric.accent === "gold";
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 text-center group"
              >
                {/* Top accent line */}
                <div
                  className={`h-[2px] w-12 mx-auto mb-6 rounded-full ${
                    isGold ? "bg-brand-primary" : "bg-brand-secondary"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center ${
                    isGold
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "bg-brand-secondary/10 text-brand-secondary"
                  }`}
                >
                  <Icon size={26} />
                </div>

                {/* Value */}
                <div
                  className={`text-4xl lg:text-5xl font-heading font-bold mb-3 ${
                    isGold ? "text-gold-gradient" : "text-green-gradient"
                  }`}
                >
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                  />
                </div>

                {/* Label */}
                <p className="text-brand-grey text-sm font-body tracking-wider uppercase">
                  {metric.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
