"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function CinematicHero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-[#050505]"
    >
      {/* Ambient Background Effects - Soft Cinematic Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft radial glow on the right for the logo */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(255,153,51,0.08) 0%, rgba(19,136,8,0.05) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Subtle dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 pt-40 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 h-full">
          {/* LEFT SIDE - 60% */}
          <motion.div
            className="w-full lg:w-[60%] flex flex-col justify-center relative z-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Small Label */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mb-8"
            >
              <span className="w-12 h-[1px] bg-brand-primary opacity-60" />
              <span className="text-brand-primary text-xs font-heading tracking-[0.2em] font-semibold uppercase">
                Premium Institutional Research
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-heading font-bold leading-[1.1] mb-6 tracking-tight uppercase"
            >
              <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] whitespace-nowrap">
                <span className="text-brand-primary">BHRAM</span>
                <span className="text-white">ASTRA</span>
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.h2
              variants={itemVariants}
              className="font-heading font-semibold text-2xl md:text-3xl lg:text-4xl tracking-wide uppercase mb-8 leading-tight"
            >
              <span className="text-white">The Ultimate Weapon</span>
              <br />
              <span className="text-white">To Build </span>
              <span className="text-brand-secondary">Wealth</span>
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-brand-grey text-sm md:text-base leading-relaxed max-w-lg mb-10"
            >
              Institutional-grade market research and advanced data-driven
              investment strategies engineered to help traders and investors make
              disciplined, emotion-free decisions in financial markets.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="#consultation" 
                className="btn-primary py-4 text-sm"
              >
                Book Consultation
                <ArrowRight size={16} />
              </a>
              <a 
                href="#services" 
                className="btn-secondary py-4 text-sm"
              >
                Explore Research
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - 40% - Static Premium Emblem */}
          <motion.div
            className="w-full lg:w-[40%] flex justify-center items-center relative z-10"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            {/* 
              Use mix-blend-screen or lighten to drop the dark background from the jpeg,
              making it blend seamlessly into the #050505 deep black background. 
            */}
            <div className="flex flex-col items-center justify-center relative w-[350px] md:w-[450px] lg:w-[600px] mix-blend-lighten">
              <div 
                className="relative w-full h-[350px] md:h-[450px] lg:h-[600px] flex items-center justify-center"
                style={{ clipPath: 'inset(0px 0px 25% 0px)' }}
              >
                <Image
                  src="/logo-new.jpeg"
                  alt="Bhramastra Logo"
                  fill
                  style={{ objectFit: "contain", objectPosition: "top" }}
                  className="drop-shadow-2xl brightness-110 contrast-125 scale-110"
                  priority
                />
              </div>
              <div className="text-[10px] md:text-[12px] font-body font-light tracking-[0.25em] text-brand-grey uppercase mt-[-100px] lg:mt-[-150px] drop-shadow-md z-30">
                Financial Services
              </div>
            </div>
            
            {/* Ambient subtle glow overlay for extra integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none opacity-80" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs font-body tracking-[0.2em] font-medium text-brand-grey uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={16} className="text-brand-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
