"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverEffect = true,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        "glass-panel rounded-2xl p-6 sm:p-8",
        hoverEffect && "glass-panel-hover",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
