import React from "react";
import { Linkedin, Mail, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Services", href: "/services" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Risk Disclosure", href: "/risk" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const resourceLinks = [
  { label: "Market News", href: "/news" },
  { label: "Economic Calendar", href: "/insights" },
  { label: "Blogs", href: "/news" },
  { label: "Trading Insights", href: "/insights" },
];

const supportLinks = [
  { label: "FAQ", href: "/#faq" },
  { label: "Help Center", href: "/contact" },
  { label: "Book Consultation", href: "#consultation" },
];

export default function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-white/5 relative z-10">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          
          {/* Brand Column (Takes 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6 pr-0 lg:pr-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary-dark flex items-center justify-center">
                <span className="font-heading text-lg font-bold text-background">
                  B
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl tracking-[0.1em] text-brand-primary font-semibold uppercase">
                  BHRAMASTRA
                </span>
                <span className="text-[9px] font-body tracking-[0.2em] font-medium text-brand-grey uppercase mt-0.5">
                  Financial Services
                </span>
              </div>
            </div>
            
            <p className="text-brand-grey text-sm leading-relaxed mb-6">
              Institutional-grade market research and data-driven investment
              strategies engineered to help traders and investors make disciplined, emotion-free decisions.
            </p>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-brand-primary shrink-0" />
                <span className="text-brand-grey text-sm">bhramastraone@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-brand-primary shrink-0" />
                <span className="text-brand-grey text-sm">9133983607</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-brand-grey hover:text-brand-primary hover:bg-white/10 transition-all" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-brand-grey hover:text-brand-primary hover:bg-white/10 transition-all" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-brand-grey hover:text-brand-primary hover:bg-white/10 transition-all" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-sm tracking-[0.1em] text-white uppercase mb-6 font-semibold">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-brand-grey text-sm hover:text-brand-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading text-sm tracking-[0.1em] text-white uppercase mb-6 font-semibold">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-brand-grey text-sm hover:text-brand-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-sm tracking-[0.1em] text-white uppercase mb-6 font-semibold">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-brand-grey text-sm hover:text-brand-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Newsletter */}
          <div>
            <h4 className="font-heading text-sm tracking-[0.1em] text-white uppercase mb-6 font-semibold">Support</h4>
            <ul className="space-y-3 mb-8">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-brand-grey text-sm hover:text-brand-primary transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-heading text-xs tracking-[0.1em] text-white uppercase mb-4 font-semibold">Newsletter</h4>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="glass-input pr-10 text-sm"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-brand-primary hover:text-white transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-background">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-brand-grey text-xs tracking-wide">
              © {new Date().getFullYear()} BHRAMASTRA Financial Services. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-brand-grey/50 text-[10px] uppercase tracking-widest font-medium">
                SEBI Registered Research Analyst
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
