import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketTicker from "@/components/layout/MarketTicker";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ConsultationManager from "@/components/ui/ConsultationManager";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ConsultationManager />
      <MarketTicker />
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      {/* Floating Buttons Container */}
      <div className="fixed bottom-24 md:bottom-6 right-6 z-50 flex flex-col gap-4">
        {/* Call Button */}
        <a
          href="tel:+919133983607"
          className="bg-brand-saffron hover:bg-[#b5952f] text-[#050505] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center"
          aria-label="Call Us"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
        
        {/* WhatsApp Button */}
        <a
        href="https://wa.me/919133983607?text=Hello%20BHRAMASTRA,%20I%20am%20interested%20in%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] flex items-center justify-center"
        aria-label="Contact WhatsApp"
      >
        <svg
          className="w-7 h-7"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.488 1.45 5.41 1.451 5.328 0 9.667-4.33 9.67-9.663.001-2.585-1.005-5.016-2.83-6.845-1.828-1.83-4.262-2.835-6.848-2.835-5.336 0-9.678 4.331-9.68 9.664-.001 1.833.479 3.623 1.39 5.2l-.992 3.615 3.7-.972zm10.16-5.322c-.27-.135-1.597-.788-1.845-.878-.248-.09-.43-.135-.61.135-.18.27-.7.878-.857 1.058-.158.18-.315.2-.585.065-1.093-.546-1.93-1.012-2.686-2.312-.206-.357.206-.33.588-1.094.067-.136.034-.255-.017-.357-.05-.1-.43-1.035-.59-1.42-.155-.375-.31-.324-.43-.33-.11-.005-.237-.006-.363-.006-.126 0-.333.047-.507.235-.174.188-.665.65-.665 1.585 0 1.93.843 3.792 1.018 4.02.175.228 1.662 2.536 4.026 3.55.563.242 1.002.386 1.345.495.566.18 1.082.155 1.49.094.455-.068 1.597-.653 1.822-1.283.225-.63.225-1.17.157-1.283-.067-.11-.247-.195-.517-.33z" />
        </svg>
        </a>
      </div>
    </>
  );
}
