"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingDown,
  Clock,
  Flame,
  Target,
  ShieldAlert,
  Zap,
  FileX,
  CheckCircle2,
} from "lucide-react";

const problems = [
  {
    icon: Brain,
    title: "Emotional Trading",
    description:
      "Decisions driven by fear and greed instead of analysis and data.",
  },
  {
    icon: TrendingDown,
    title: "Fear & Greed",
    description:
      "Selling at lows out of panic, buying at highs out of euphoria.",
  },
  {
    icon: Clock,
    title: "FOMO Trading",
    description:
      "Jumping into trades after the move has already happened, chasing momentum.",
  },
  {
    icon: Flame,
    title: "Revenge Trading",
    description:
      "Doubling down after losses to recover, leading to even bigger drawdowns.",
  },
  {
    icon: Target,
    title: "Lack of Discipline",
    description:
      "Ignoring stop-losses, breaking rules, and deviating from the trading plan.",
  },
  {
    icon: ShieldAlert,
    title: "Poor Risk Management",
    description:
      "Overleveraging positions and not sizing trades according to risk capacity.",
  },
  {
    icon: Zap,
    title: "Chasing Moves",
    description:
      "Entering after the big move, catching the tail end instead of the trend.",
  },
  {
    icon: FileX,
    title: "No Trading Plan",
    description:
      "Operating without a structured framework, relying on tips and intuition.",
  },
];

const solutions = [
  "Institutional-grade market analysis and research",
  "Structured, rule-based trading frameworks",
  "Systematic risk management protocols",
  "Data-driven entry and exit signals",
  "Disciplined execution methodology",
  "Continuous education and mentorship",
];

export default function WhyChooseSection() {
  return (
    <section id="why-BHRAMASTRA" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-[11px] font-heading tracking-[0.3em] uppercase">
            The Problem & Our Solution
          </span>
          <h2 className="section-title mt-3">
            WHY <span className="text-gold-gradient">BHRAMASTRA</span>?
          </h2>
          <div className="section-divider mt-4" />
          <p className="section-subtitle mt-4">
            Most retail traders struggle not because of the market — but because
            of these common pitfalls that erode capital and confidence.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                className="glass-card p-6 group hover:border-red-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <Icon size={22} className="text-red-400" />
                </div>
                <h4 className="font-heading text-sm tracking-wider text-white mb-2">
                  {problem.title}
                </h4>
                <p className="text-brand-grey text-xs leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Solution Section */}
        <motion.div
          className="glass-panel-gold rounded-card p-10 md:p-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-brand-green text-[11px] font-heading tracking-[0.3em] uppercase">
                The BHRAMASTRA Advantage
              </span>
              <h3 className="font-heading text-2xl md:text-3xl tracking-wider text-white mt-3 mb-4">
                Structured Decisions.
                <br />
                <span className="text-green-gradient">Disciplined Execution.</span>
              </h3>
              <p className="text-brand-grey leading-relaxed text-sm">
                BHRAMASTRA helps traders transition from impulsive, emotion-driven
                decisions to structured, research-backed strategies. Our
                institutional analysis framework provides clarity in volatile
                markets — though no strategy can guarantee profits, disciplined
                execution significantly improves the odds.
              </p>
            </div>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle2
                    size={18}
                    className="text-brand-green shrink-0 mt-0.5"
                  />
                  <span className="text-white text-sm">{solution}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
