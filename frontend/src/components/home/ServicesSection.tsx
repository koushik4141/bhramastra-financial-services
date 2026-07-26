"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const plans = [
  {
    name: "Starter",
    duration: "3 Months",
    price: "30,000",
    highlight: false,
    badge: null,
    features: [
      "Intraday Advisory",
      "Swing Calls",
      "BTST Calls",
      "Positional Calls",
      "Commodity Advisory",
      "WhatsApp Support",
      "Risk Management Guidance",
    ],
    cta: "Get Started",
    ctaClass: "btn-secondary",
  },
  {
    name: "Professional",
    duration: "6 Months",
    price: "50,000",
    highlight: false,
    badge: null,
    features: [
      "Everything in Starter",
      "Portfolio Review",
      "Weekly Sessions",
      "Priority Support",
      "Advanced Reports",
    ],
    cta: "Choose Professional",
    ctaClass: "btn-primary",
  },
  {
    name: "Elite",
    duration: "12 Months",
    price: "1,00,000",
    highlight: true,
    badge: "RECOMMENDED",
    features: [
      "Everything in Professional",
      "Dedicated Analyst Support",
      "Exclusive Research",
      "Premium Alerts",
      "Highest Priority Support",
    ],
    cta: "Go Elite",
    ctaClass: "btn-primary",
  },
];

export default function ServicesSection() {
  const pathname = usePathname();
  return (
    <section id="services" className="section-padding bg-background-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-primary text-xs font-heading tracking-[0.2em] font-semibold uppercase">
            Investment Plans
          </span>
          <h2 className="section-title mt-3">
            OUR <span className="text-brand-primary">SERVICES</span>
          </h2>
          <div className="section-divider mt-4" />
          <p className="section-subtitle mt-4">
            Choose the plan that aligns with your investment goals and trading
            frequency.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-card overflow-hidden ${
                plan.highlight
                  ? "pricing-highlight glass-card md:scale-105 md:-my-4"
                  : "glass-card"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Recommended Badge */}
              {plan.badge && (
                <div className="bg-brand-secondary text-background text-[10px] font-body font-bold tracking-[0.2em] uppercase text-center py-2">
                  <Star size={12} className="inline mr-1 -mt-0.5" />
                  {plan.badge}
                </div>
              )}

              <div className="p-8 md:p-10">
                {/* Plan Name & Duration */}
                <div className="mb-6">
                  <h3 className="font-heading text-xl tracking-wider text-white mb-1">
                    {plan.name}
                  </h3>
                  <span className="text-brand-grey text-xs tracking-wider uppercase">
                    {plan.duration}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-brand-grey text-sm">₹</span>
                  <span
                    className={`text-4xl md:text-5xl font-heading font-bold ml-1 ${
                      plan.highlight
                        ? "text-brand-secondary"
                        : "text-brand-primary"
                    }`}
                  >
                    {plan.price}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-white/10 mb-8" />

                {/* Features */}
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check
                        size={16}
                        className={`shrink-0 mt-0.5 ${
                          plan.highlight
                            ? "text-brand-secondary"
                            : "text-brand-primary"
                        }`}
                      />
                      <span className="text-brand-grey-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href="#consultation"
                  className={`${plan.ctaClass} w-full justify-center`}
                >
                  {plan.cta}
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore Services Button */}
        {pathname === "/" && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/services" 
              className="btn-secondary text-sm"
            >
              Explore Services <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
