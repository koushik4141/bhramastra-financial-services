"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from "framer-motion";

const PARTICLE_COUNT = 40;

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: "gold" | "white";
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 6 + 6,
    delay: Math.random() * 3,
    color: Math.random() > 0.7 ? "white" : "gold",
  }));
}

export default function CinematicLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const particles = React.useMemo(() => generateParticles(), []);

  // Parallax Mouse values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Logo rotation (max 3 degrees)
  const rotateX = useTransform(smoothMouseY, [0, 1], [3, -3]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-3, 3]);

  // Glow shift
  const glowX = useTransform(smoothMouseX, [0, 1], [-20, 20]);
  const glowY = useTransform(smoothMouseY, [0, 1], [-20, 20]);

  // Particles shift
  const particlesX = useTransform(smoothMouseX, [0, 1], [-15, 15]);
  const particlesY = useTransform(smoothMouseY, [0, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  useEffect(() => {
    const sequence = async () => {
      // 1. Black Screen (initial state handles this)
      
      // 2. Blue ambient glow appears
      controls.start("glowIn");
      await new Promise(r => setTimeout(r, 1000));

      // 3. Gold particles slowly emerge
      controls.start("particlesIn");
      await new Promise(r => setTimeout(r, 1500));

      // 4. Logo fades from darkness & 5. Soft camera zoom
      controls.start("logoReveal");
      await new Promise(r => setTimeout(r, 2000));

      // 6. Golden light sweeps across the logo
      controls.start("lightSweep");
      await new Promise(r => setTimeout(r, 1500));

      // 7. Blue energy pulses behind the logo
      controls.start("bluePulse");
      await new Promise(r => setTimeout(r, 1500));

      // 8. Infinite seamless loop starts automatically via repeating animations
      controls.start("loopingGlow");
      controls.start("loopingFloat");
    };

    sequence();
  }, [controls]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[700px] flex items-center justify-center pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      {/* --- Blue Ambient Glow (Behind) --- */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(31, 111, 255, 0.15) 0%, transparent 60%)",
          filter: "blur(60px)",
          x: glowX,
          y: glowY,
        }}
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          glowIn: { opacity: 1, scale: 1, transition: { duration: 2, ease: "easeOut" } },
          loopingGlow: { opacity: [1, 0.7, 1], scale: [1, 1.05, 1], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } }
        }}
        initial="hidden"
        animate={controls}
      />

      {/* --- Blue Energy Pulse --- */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(73, 162, 255, 0.1) 0%, transparent 50%)",
          filter: "blur(40px)",
        }}
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          bluePulse: { opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.5], transition: { duration: 2, ease: "easeOut" } },
          loopingGlow: { opacity: [0, 0.2, 0], scale: [0.8, 1.2, 1.5], transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 } }
        }}
        initial="hidden"
        animate={controls}
      />

      {/* --- Particles Container --- */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ x: particlesX, y: particlesY }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color === "gold" ? "#D4AF37" : "#FFFFFF",
              boxShadow: `0 0 ${p.size * 2}px ${p.color === "gold" ? "#D4AF37" : "#FFFFFF"}`,
            }}
            variants={{
              hidden: { opacity: 0, scale: 0, y: 10 },
              particlesIn: { opacity: 0.6, scale: 1, y: 0, transition: { duration: 2, delay: p.delay } },
              loopingFloat: {
                y: [0, -20, 0],
                x: [0, p.id % 2 === 0 ? 10 : -10, 0],
                opacity: [0.6, 1, 0.6],
                transition: { duration: p.duration, repeat: Infinity, ease: "easeInOut" }
              }
            }}
            initial="hidden"
            animate={controls}
          />
        ))}
      </motion.div>

      {/* --- Main Logo Container (JPEG with Screen Blend to remove black background) --- */}
      <motion.div
        className="relative z-10 w-[650px] h-[650px] flex items-center justify-center pointer-events-none"
        style={{ 
          rotateX, 
          rotateY,
          mixBlendMode: "screen", // Crucial for blending the JPEG's black background into the hero's dark background
        }}
        variants={{
          hidden: { opacity: 0, scale: 0.8, filter: "brightness(0) blur(10px)" },
          logoReveal: { 
            opacity: 1, 
            scale: 1, 
            filter: "brightness(1) blur(0px)",
            transition: { duration: 2, ease: [0.25, 0.46, 0.45, 0.94] } // Soft camera zoom ease
          },
          loopingFloat: {
            y: [-5, 5, -5],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
        }}
        initial="hidden"
        animate={controls}
      >
        {/* Wrapper to crop out the text at the bottom of the image */}
        <div className="w-[100%] h-[75%] overflow-hidden flex items-start justify-center">
          <img 
            src="/brand-logo.jpeg" 
            alt="BHRAMASTRA Cinematic Logo" 
            className="w-full h-auto object-cover"
            style={{ 
              objectPosition: "center top",
              transform: "scale(1.1) translateY(5%)" // zoom in slightly to remove black edges if any
            }}
          />
        </div>

        {/* --- Golden Light Sweep --- */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FFD76A] to-transparent opacity-0 pointer-events-none"
          style={{ mixBlendMode: "overlay" }}
          variants={{
            hidden: { left: "-100%", opacity: 0 },
            lightSweep: { 
              left: "100%", 
              opacity: [0, 0.4, 0],
              transition: { duration: 1.5, ease: "easeInOut" }
            },
            loopingGlow: {
              left: ["-100%", "100%"],
              opacity: [0, 0.15, 0],
              transition: { duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }
            }
          }}
          initial="hidden"
          animate={controls}
        />
      </motion.div>
    </div>
  );
}
