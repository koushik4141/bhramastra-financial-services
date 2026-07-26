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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-header shadow-lg"
          : "bg-transparent"
      }`}
      style={{ top: "calc(40px + 22px)" }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex items-center justify-center">
              <img src="/logo-new.jpeg" alt="Logo" className="h-6 md:h-12 w-auto object-contain rounded-md" />
            </div>
            <div className="flex flex-col">
               <span className="font-heading text-lg md:text-3xl tracking-[0.1em] text-brand-saffron font-bold uppercase">
                BHRAMASTRA
              </span>
              <span className="text-[7px] md:text-[11px] font-body tracking-[0.2em] font-light text-brand-grey uppercase -mt-1 text-center w-full block">
                Financial Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link text-[11px] font-body font-medium tracking-[0.15em] text-brand-grey-light uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex btn-primary !text-[9px] md:!text-[11px] !px-3 !py-1.5 md:!px-6 md:!py-3 whitespace-nowrap"
            >
              Book Consultation
            </Link>
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <span className="text-2xl leading-none select-none font-bold text-white">⋮</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-header border-t border-white/5"
          >
            <nav className="flex flex-col py-6 px-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 px-4 text-[12px] font-body font-medium tracking-[0.15em] text-brand-grey-light uppercase hover:text-brand-gold hover:bg-white/5 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                className="btn-primary text-[11px] mt-4 text-center block"
                onClick={() => setIsOpen(false)}
              >
                Book Consultation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
