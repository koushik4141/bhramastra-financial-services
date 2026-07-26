"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

type ToastType = "success" | "error";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

interface ToastContextValue {
  showToast: (type: ToastType, title: string, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, title: string, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto bg-[#0A0F1A] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl p-4 flex items-start gap-3"
            >
              {toast.type === "success" ? (
                <CheckCircle className="text-brand-green shrink-0 mt-0.5" size={20} />
              ) : (
                <XCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-heading font-semibold text-sm">{toast.title}</p>
                <p className="text-brand-grey text-xs mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className="text-brand-grey hover:text-white transition-colors shrink-0"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
