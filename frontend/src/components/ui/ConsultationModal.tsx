"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, User, Mail, Phone, Calendar, MessageSquare,
  Briefcase, Loader2, Send, CheckCircle
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  "Intraday Trading Signals",
  "Swing Trading Advisory",
  "Positional Trading",
  "Portfolio Management Guidance",
  "Options & Derivatives Strategy",
  "Mutual Fund & SIP Advisory",
  "General Stock Market Consultation",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDateTime: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Full name is required";
  if (!data.email.trim()) {
    errors.email = "Email address is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (data.phone && !/^\+?[\d\s\-]{7,15}$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }
  return errors;
}

const emptyForm: FormData = {
  name: "", email: "", phone: "",
  service: "General Consultation",
  preferredDateTime: "", message: "Consultation requested.",
};

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
      const res = await fetch(`${apiBase}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(10000),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        showToast("success", "Consultation Booked!", "Our advisor will contact you within 24 hours.");
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setForm(emptyForm);
        }, 2000);
      } else {
        showToast("error", "Submission Failed", data.error || "Please try again.");
      }
    } catch {
      showToast("error", "Network Error", "Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const fieldClass = (field: keyof FormErrors) =>
    `w-full bg-white/5 border ${
      errors[field] ? "border-red-500/60" : "border-white/10"
    } rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-brand-primary/60 focus:bg-white/[0.08] transition-all`;

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#080D16] border border-white/10 rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.8)] z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
            role="dialog"
            aria-modal="true"
            aria-label="Book a Consultation"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-8 pb-6 border-b border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent rounded-t-3xl pointer-events-none" />
              <div className="relative flex items-start justify-between">
                <div>
                  <span className="text-brand-primary text-[10px] font-heading tracking-[0.3em] uppercase block mb-2">
                    Premium Advisory
                  </span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                    Book a Consultation
                  </h2>
                  <p className="text-brand-grey text-sm mt-1.5">
                    Get personalised guidance from our market experts.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-brand-grey hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} noValidate className="p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-body font-medium text-brand-grey uppercase tracking-wider mb-1.5" htmlFor="c-name">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    <input ref={firstInputRef} id="c-name" name="name" type="text"
                      placeholder="Rahul Sharma" value={form.name} onChange={handleChange}
                      className={`${fieldClass("name")} pl-9`} />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-body font-medium text-brand-grey uppercase tracking-wider mb-1.5" htmlFor="c-email">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    <input id="c-email" name="email" type="email"
                      placeholder="you@example.com" value={form.email} onChange={handleChange}
                      className={`${fieldClass("email")} pl-9`} />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-[11px] font-body font-medium text-brand-grey uppercase tracking-wider mb-1.5" htmlFor="c-phone">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  <input id="c-phone" name="phone" type="tel"
                    placeholder="+91 98765 43210" value={form.phone} onChange={handleChange}
                    className={`${fieldClass("phone")} pl-9`} />
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              <button
                type="submit"
                disabled={loading || submitted}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                ) : submitted ? (
                  <><CheckCircle size={16} /> Submitted!</>
                ) : (
                  <><Send size={16} /> Book My Consultation</>
                )}
              </button>

              <p className="text-center text-brand-grey/40 text-[11px] tracking-widest uppercase">
                No obligation · Strictly confidential
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
