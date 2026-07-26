import React from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin, ArrowRight } from "lucide-react";
import { PremiumButton } from "@/components/ui/PremiumButton";

export const metadata = {
  title: 'Contact Us | BHRAMASTRA Financial Services',
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 bg-background min-h-[90vh]">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest uppercase mb-4 text-white">
          Contact <span className="text-brand-saffron">Us</span>
        </h1>
        <p className="text-brand-grey max-w-2xl text-lg mb-16">
          Reach out to our experts for personalized financial advice and institutional-grade trading insights. We are here to help you build wealth with confidence.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Details */}
          <div className="space-y-10">
            <div>
              <h3 className="font-heading text-xl tracking-widest uppercase text-white mb-6 flex items-center gap-3">
                <MapPin className="text-brand-saffron" /> Corporate Office
              </h3>
              <p className="text-brand-grey">
                Coming Soon<br/>
                Mumbai, Maharashtra, India
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl tracking-widest uppercase text-white mb-6 flex items-center gap-3">
                <Mail className="text-brand-saffron" /> Email Address
              </h3>
              <p className="text-brand-grey">
                bhramastraone@gmail.com
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl tracking-widest uppercase text-white mb-6 flex items-center gap-3">
                <Phone className="text-brand-saffron" /> Phone Number
              </h3>
              <p className="text-brand-grey">
                9133983607
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl tracking-widest uppercase text-white mb-6 flex items-center gap-3">
                <Clock className="text-brand-saffron" /> Business Hours
              </h3>
              <p className="text-brand-grey">
                Monday - Friday: 9:00 AM - 6:00 PM<br/>
                Saturday: 10:00 AM - 2:00 PM<br/>
                Sunday: Closed
              </p>
            </div>

            <div className="pt-6 border-t border-white/5">
              <h3 className="font-heading text-sm tracking-widest uppercase text-white mb-6">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-grey hover:text-brand-saffron hover:bg-white/10 transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-grey hover:text-brand-saffron hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Map and CTA */}
          <div className="flex flex-col gap-8">
            <div className="w-full h-64 md:h-80 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6">
                 <MapPin className="text-brand-saffron w-10 h-10 mb-4 opacity-80" />
                 <h4 className="text-white font-heading tracking-widest uppercase mb-2">Location Map</h4>
                 <p className="text-brand-grey text-sm">Interactive map will be available once the physical office is inaugurated.</p>
              </div>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
            </div>

            <div className="bg-gradient-to-br from-[#0A0F1A] to-[#050505] border border-white/10 rounded-2xl p-8 md:p-12 mt-auto">
              <h3 className="font-heading text-2xl tracking-widest uppercase text-white mb-4">
                Ready to Start?
              </h3>
              <p className="text-brand-grey mb-8">
                Schedule a one-on-one session with our financial experts to discuss your portfolio and trading goals.
              </p>
              <a href="#consultation">
                <PremiumButton variant="primary" className="w-full">
                  Book Consultation <ArrowRight size={16} className="ml-2" />
                </PremiumButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
