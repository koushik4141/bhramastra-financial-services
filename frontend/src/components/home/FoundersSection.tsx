"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

const founders = [
  {
    name: "Keshav",
    role: "Co-Founder",
    initials: "K",
    accent: "gold" as const,
    skills: ["Market Research", "Strategy Development", "Risk Management"],
    bio: "With deep expertise in market microstructure and technical analysis, Keshav drives the core research methodology that powers BHRAMASTRA's advisory framework.",
  },
  {
    name: "Koushik",
    role: "Co-Founder",
    initials: "K",
    accent: "green" as const,
    skills: ["AI Systems", "Quantitative Research", "Technology & Automation"],
    bio: "Koushik architects the technology backbone — from quantitative models and AI-driven analytics to the automated systems that deliver real-time market intelligence.",
  },
];

export default function FoundersSection() {
  return (
    <section id="founders" className="section-padding">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-[11px] font-heading tracking-[0.3em] uppercase">
            Leadership
          </span>
          <h2 className="section-title mt-3">
            MEET THE <span className="text-gold-gradient">FOUNDERS</span>
          </h2>
          <div className="section-divider mt-4" />
        </motion.div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((founder, index) => {
            const isGold = founder.accent === "gold";
            return (
              <motion.div
                key={founder.name}
                className={`glass-card p-8 md:p-10 text-center ${
                  isGold
                    ? "hover:border-brand-gold/30"
                    : "hover:border-brand-green/30 glass-card-green"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Avatar */}
                <div
                  className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-heading font-bold ${
                    isGold
                      ? "bg-brand-gold/10 text-brand-gold border-2 border-brand-gold/30"
                      : "bg-brand-green/10 text-brand-green border-2 border-brand-green/30"
                  }`}
                >
                  {founder.initials}
                </div>

                {/* Name & Role */}
                <h3 className="font-heading text-2xl tracking-wider text-white mb-1">
                  {founder.name}
                </h3>
                <span
                  className={`text-xs tracking-[0.2em] uppercase font-body font-semibold ${
                    isGold ? "text-brand-gold" : "text-brand-green"
                  }`}
                >
                  {founder.role}
                </span>

                {/* Bio */}
                <p className="text-brand-grey text-sm leading-relaxed mt-4 mb-6">
                  {founder.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {founder.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-[10px] font-body tracking-wider uppercase ${
                        isGold
                          ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/20"
                          : "bg-brand-green/10 text-brand-green border border-brand-green/20"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3">
                  <a
                    href="#"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isGold
                        ? "bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20"
                        : "bg-brand-green/10 text-brand-green hover:bg-brand-green/20"
                    }`}
                    aria-label={`${founder.name} LinkedIn`}
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="#"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isGold
                        ? "bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20"
                        : "bg-brand-green/10 text-brand-green hover:bg-brand-green/20"
                    }`}
                    aria-label={`${founder.name} Email`}
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
