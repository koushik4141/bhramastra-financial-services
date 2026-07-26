"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface MarketTickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(price);
};

const TickerItemCard = ({ item, onHover, onLeave }: { item: MarketTickerItem, onHover: (e: React.MouseEvent, item: MarketTickerItem) => void, onLeave: () => void }) => {
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const prevPriceRef = useRef(item.price);

  useEffect(() => {
    if (item.price > prevPriceRef.current) {
      setFlash("up");
    } else if (item.price < prevPriceRef.current) {
      setFlash("down");
    }
    prevPriceRef.current = item.price;
    
    if (flash) {
      const timer = setTimeout(() => setFlash(null), 300);
      return () => clearTimeout(timer);
    }
  }, [item.price]);

  const isPositive = item.change > 0;
  const isNegative = item.change < 0;
  
  const changeColor = isPositive ? "text-brand-secondary" : isNegative ? "text-red-500" : "text-white";
  const icon = isPositive ? "▲" : isNegative ? "▼" : "";
  const sign = isPositive ? "+" : "";

  return (
    <div 
      className="inline-flex items-center gap-3 px-6 py-2 cursor-default"
      onMouseEnter={(e) => onHover(e, item)}
      onMouseLeave={onLeave}
    >
      <span className="text-[11px] font-body font-medium text-brand-grey tracking-wide">
        {item.name}
      </span>
      <span className={`text-[11px] font-body font-semibold transition-colors duration-300 ${flash === "up" ? "text-brand-secondary" : flash === "down" ? "text-red-500" : "text-white"}`}>
        {formatPrice(item.price)}
      </span>
      <span className={`text-[11px] font-body font-semibold ${changeColor}`}>
        {icon} {sign}{formatPrice(item.changePercent)}%
      </span>
      <span className="text-white/10">│</span>
    </div>
  );
};

export default function MarketTicker() {
  const [marketData, setMarketData] = useState<MarketTickerItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  
  const [tooltipData, setTooltipData] = useState<MarketTickerItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let retryCount = 0;

    const fetchData = async () => {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const res = await fetch(`${apiBase}/market`, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`API error ${res.status}`);

        const result = await res.json();

        if (result.success && result.data) {
          setMarketData(result.data);
          if (result.lastUpdated) {
            setLastUpdated(new Date(result.lastUpdated).toLocaleTimeString());
          }
          retryCount = 0; // reset on success
        }
      } catch (e: any) {
        clearTimeout(timeoutId);
        // Only log on first failure to avoid console spam
        if (retryCount === 0) {
          console.warn("[MarketTicker] Could not reach market API — will retry silently.", e?.message);
        }
        retryCount++;
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleHover = (e: React.MouseEvent, item: MarketTickerItem) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setTooltipData(item);
  };
  const handleLeave = () => setTooltipData(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltipData) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  // Duplicate items to create infinite scroll effect
  const tickerItems = [...marketData, ...marketData, ...marketData, ...marketData, ...marketData, ...marketData];

  // If no data yet, maintain layout without crashing
  if (marketData.length === 0) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[60] select-none">
        <div className="bg-background-secondary border-b border-white/5 h-[34px]" />
        <div className="bg-amber-500/90 backdrop-blur-sm h-[20px]" />
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] select-none" onMouseMove={handleMouseMove}>
      
      {/* Custom Tooltip */}
      <AnimatePresence>
        {tooltipData && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[100] bg-background-elevated border border-brand-secondary/20 backdrop-blur-xl shadow-hover rounded-xl p-4 w-56 pointer-events-none"
            style={{ top: mousePos.y + 20, left: mousePos.x + 20 }}
          >
            <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
              <span className="text-white font-heading font-bold text-sm tracking-wide">{tooltipData.name}</span>
              <span className={`text-xs font-semibold ${tooltipData.change > 0 ? "text-brand-secondary" : tooltipData.change < 0 ? "text-red-500" : "text-white"}`}>
                {tooltipData.change > 0 ? "+" : ""}{formatPrice(tooltipData.change)}
              </span>
            </div>
            
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-brand-grey uppercase tracking-wider">Open</span>
                <span className="text-white font-medium">{formatPrice(tooltipData.open)}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-brand-grey uppercase tracking-wider">High</span>
                <span className="text-white font-medium">{formatPrice(tooltipData.high)}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-brand-grey uppercase tracking-wider">Low</span>
                <span className="text-white font-medium">{formatPrice(tooltipData.low)}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-brand-grey uppercase tracking-wider">Prev Close</span>
                <span className="text-white font-medium">{formatPrice(tooltipData.prevClose)}</span>
              </div>
              <div className="flex justify-between text-[9px] mt-2 pt-1 border-t border-white/5">
                <span className="text-brand-grey/60">Updated</span>
                <span className="text-brand-grey/80">{lastUpdated}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row 1: Live Market Data */}
      <div className="bg-background border-b border-white/5 overflow-hidden flex whitespace-nowrap">
        <div className="animate-ticker inline-flex min-w-full hover:[animation-play-state:paused]">
          {tickerItems.map((item, index) => (
            <TickerItemCard 
              key={`${item.symbol}-${index}`} 
              item={item} 
              onHover={handleHover} 
              onLeave={handleLeave} 
            />
          ))}
        </div>
      </div>

      {/* Row 2: Risk Disclaimer */}
      <div className="bg-brand-primary backdrop-blur-sm overflow-hidden flex whitespace-nowrap">
        <div className="py-[3px] ticker-fast inline-flex min-w-full">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-[10px] font-body font-medium text-black tracking-wide px-8">
              ⚠ Investments in securities market are subject to market risks. Read all related documents carefully before investing.
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
