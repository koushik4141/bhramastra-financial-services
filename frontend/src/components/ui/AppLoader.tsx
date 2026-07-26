"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AppLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if it's the very first load in the session
    const hasLoaded = sessionStorage.getItem("appLoaded");
    
    if (hasLoaded) {
      setLoading(false);
      return;
    }
    
    // Simulate initial loading time for assets
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("appLoaded", "true");
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,153,51,0.2)]">
              <Image 
                src="/logo-new.jpeg" 
                alt="Bhramastra Logo" 
                fill 
                className="object-cover scale-[1.3] pt-4"
                priority 
              />
            </div>
            
            <div className="flex flex-col items-center">
              <span className="font-heading text-xl md:text-2xl tracking-[0.2em] text-brand-saffron font-bold uppercase">
                BHRAMASTRA
              </span>
              <span className="text-[10px] md:text-[11px] font-body tracking-[0.3em] font-light text-brand-grey uppercase mt-1">
                Financial Services
              </span>
            </div>
            
            <div className="w-48 h-[1px] bg-white/10 mt-4 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-brand-saffron"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
