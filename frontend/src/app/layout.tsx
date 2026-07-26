import { Inter, Outfit } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketTicker from "@/components/layout/MarketTicker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BHRAMASTRA | The Ultimate Weapon for Wealth Creation",
  description:
    "Institutional-grade market research and advanced data-driven investment strategies engineered to help traders and investors make disciplined, emotion-free decisions in financial markets.",
  keywords:
    "Wealth Creation, Investment Advisory, Stock Advisory India, Premium Trading, Institutional Research, Market Intelligence",
  openGraph: {
    title: "BHRAMASTRA | The Ultimate Weapon for Wealth Creation",
    description:
      "Institutional-grade market research and advanced data-driven investment strategies.",
    type: "website",
    locale: "en_IN",
  },
  icons: { icon: "/logo.png" },
};

import { ToastProvider } from "@/components/ui/Toast";
import AppLoader from "@/components/ui/AppLoader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-white font-body">
        <AppLoader />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
