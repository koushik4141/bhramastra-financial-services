"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "NEWS", href: "/news" },
  { label: "CONTACT", href: "/contact" },
  { label: "ADMIN LOGIN", href: "/admin" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Prevent scrolling when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-header shadow-soft"
          : "bg-transparent"
      }`}
      style={{ top: "calc(40px + 22px)" }}
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-50">
            <div className="flex items-center justify-center">
              <img src="/logo-new.jpeg" alt="Logo" className="h-10 w-auto object-contain rounded-md" />
            </div>
            <div className="flex flex-col">
               <span className="font-heading text-2xl md:text-3xl tracking-tight text-brand-primary font-bold uppercase leading-none">
                BHRAMASTRA
              </span>
              <span className="text-[10px] md:text-[11px] font-body tracking-[0.2em] font-medium text-brand-grey uppercase mt-1 text-left w-full block">
                Financial Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link text-xs font-body font-medium tracking-[0.1em] text-brand-grey-light uppercase transition-colors hover:text-brand-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-50">
            <Link
              href="/contact"
              className="hidden md:inline-flex btn-primary text-xs px-6 py-2.5"
            >
              Book Consultation
            </Link>
            <button
              className="lg:hidden text-white p-2 hover:text-brand-primary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col pt-32 pb-8 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-6 items-center flex-grow justify-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05), duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="block text-2xl font-heading font-medium tracking-wide text-brand-white uppercase hover:text-brand-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-auto flex flex-col items-center gap-4"
            >
              <Link
                href="/contact"
                className="btn-primary w-full text-center text-sm py-4"
                onClick={() => setIsOpen(false)}
              >
                Book Consultation
              </Link>
              <p className="text-brand-grey text-xs tracking-widest uppercase">
                Premium Institutional Research
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
