"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PremiumButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center px-8 py-4 font-heading font-bold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm overflow-hidden";

  const variants = {
    primary:
      "bg-brand-primary text-background hover:bg-brand-primary-dark shadow-[0_0_15px_rgba(255,153,51,0.4)] hover:shadow-[0_0_25px_rgba(255,153,51,0.6)]",
    secondary:
      "bg-background text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-background",
    outline: "border border-white/20 text-white hover:border-brand-primary hover:text-brand-primary bg-white/5 backdrop-blur-md",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
