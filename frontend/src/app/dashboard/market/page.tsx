"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Compass } from "lucide-react";
import { apiFetch } from "@/utils/api";

interface IndexInfo {
  name: string;
  value: number;
  change: number;
  pct: number;
}

interface NewsItem {
  id: string;
  title: string;
  link?: string;
  source: string;
  time: string;
  sentiment: "BULLISH" | "BEARISH" | "NEUTRAL";
}

export default function MarketDashboard() {
  const [indices, setIndices] = useState<IndexInfo[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sentiment, setSentiment] = useState(50); // Default neutral
  
  // Hardcoded gainers/losers for now, can be dynamically mapped if API is expanded
  const gainers = [
    { symbol: "TATASTEEL", price: "168.45", pct: "+4.65%" },
    { symbol: "RELIANCE", price: "2460.10", pct: "+2.85%" },
    { symbol: "INFY", price: "1425.20", pct: "+2.12%" },
    { symbol: "HDFCBANK", price: "1530.80", pct: "+1.95%" },
  ];
  const losers = [
    { symbol: "AXISBANK", price: "1124.50", pct: "-2.35%" },
    { symbol: "ICICIBANK", price: "1085.10", pct: "-1.80%" },
    { symbol: "SBIN", price: "812.40", pct: "-1.45%" },
    { symbol: "WIPRO", price: "462.15", pct: "-1.10%" },
  ];

  const fetchLiveData = async () => {
    try {
      setLoading(true);
      const [fetchedIndices, fetchedNews] = await Promise.all([
        apiFetch<IndexInfo[]>("/market/indices").catch(() => []),
        apiFetch<NewsItem[]>("/market/news").catch(() => []),
      ]);

      if (fetchedIndices && fetchedIndices.length > 0) {
        setIndices(fetchedIndices);
        
        // Calculate a rough sentiment based on indices performance
        const totalPct = fetchedIndices.reduce((acc, idx) => acc + idx.pct, 0);
        let calculatedSentiment = 50 + (totalPct * 10);
        calculatedSentiment = Math.max(10, Math.min(95, calculatedSentiment));
        setSentiment(Math.round(calculatedSentiment));
      }
      if (fetchedNews && fetchedNews.length > 0) {
        setNews(fetchedNews);
      }
    } catch (error) {
      console.error("Failed to fetch live market data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
    
    // Auto-refresh data every 60 seconds
    const timer = setInterval(() => {
      fetchLiveData();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-brand-darker relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-white">Live Market Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Real-time NSE indices and Moneycontrol market news.</p>
        </div>

        {/* Indices Tickers Row */}
        {loading && indices.length === 0 ? (
          <div className="text-brand-green font-bold text-center py-8">Fetching live market data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {indices.map((idx, i) => {
              const isUp = idx.pct >= 0;
              return (
                <div key={i} className="glass-panel p-6 rounded-2xl border border-brand-green/15 bg-gradient-to-b from-brand-dark to-brand-darker flex justify-between items-center relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[45px] pointer-events-none opacity-10 ${
                    isUp ? "bg-emerald-400" : "bg-red-400"
                  }`} />
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{idx.name}</span>
                    <p className="text-2xl font-bold font-poppins text-white">{idx.value.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
                      isUp ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25" : "bg-red-500/10 text-red-400 border border-red-500/25"
                    }`}>
                      {isUp ? <ArrowUpRight className="h-4.5 w-4.5" /> : <ArrowDownRight className="h-4.5 w-4.5" />}
                      {isUp ? "+" : ""}{idx.pct}%
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">{idx.change > 0 ? "+" : ""}{idx.change}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Sentiment Gauge & Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sentiment Dial */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-brand-green/15 flex flex-col justify-between items-center text-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-green self-start">Market Sentiment Gauge</h3>
            <div className="relative w-48 h-28 flex items-end justify-center overflow-hidden my-6">
              <svg className="w-48 h-24 transform -rotate-180" viewBox="0 0 100 50">
                <path d="M 10,50 A 40,40 0 0,1 90,50" fill="none" stroke="#ef4444" strokeWidth="10" />
                <path d="M 50,50 A 40,40 0 0,1 90,50" fill="none" stroke="#10b981" strokeWidth="10" />
                <g transform={`rotate(${sentiment * 1.8}, 50, 50)`}>
                  <line x1="50" y1="50" x2="50" y2="15" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="4" fill="#10b981" />
                </g>
              </svg>
              <div className="absolute bottom-1 font-poppins font-bold text-2xl text-white">
                {sentiment}%
              </div>
            </div>
            <div>
              <span className="text-xs text-brand-green font-bold uppercase tracking-wider">
                {sentiment > 70 ? "Strongly Bullish" : sentiment > 50 ? "Mildly Bullish" : "Neutral/Bearish"}
              </span>
              <p className="text-[10px] text-gray-400 mt-1 max-w-xs">
                Aggregate technical sentiment compiled across live indices.
              </p>
            </div>
          </div>

          {/* Gainers and Losers */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-brand-green/15 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                Top Gainers (Demo)
              </h3>
              <div className="divide-y divide-gray-800/60">
                {gainers.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 text-xs">
                    <span className="font-bold text-white">{item.symbol}</span>
                    <div className="text-right">
                      <p className="font-semibold text-gray-300">₹{item.price}</p>
                      <p className="text-emerald-400 font-bold text-[10px]">{item.pct}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-brand-green/15 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-400 rounded-full" />
                Top Losers (Demo)
              </h3>
              <div className="divide-y divide-gray-800/60">
                {losers.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 text-xs">
                    <span className="font-bold text-white">{item.symbol}</span>
                    <div className="text-right">
                      <p className="font-semibold text-gray-300">₹{item.price}</p>
                      <p className="text-red-400 font-bold text-[10px]">{item.pct}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* News Feed */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-green/15 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-green flex items-center gap-2">
            <Compass className="h-4.5 w-4.5" />
            Live Market News
          </h3>
          {loading && news.length === 0 ? (
            <div className="text-gray-400 text-sm">Fetching latest headlines from Moneycontrol...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map((item) => (
                <div key={item.id} className="p-4 bg-brand-darkLight/40 border border-gray-800 rounded-xl space-y-3 relative hover:border-brand-green/30">
                  <div className="flex justify-between items-center text-[10px] font-semibold text-gray-400">
                    <span>{item.source} • {new Date(item.time).toLocaleTimeString()}</span>
                    <span className={`px-2 py-0.5 rounded uppercase font-bold tracking-wider ${
                      item.sentiment === "BULLISH" ? "bg-emerald-500/10 text-emerald-400" :
                      item.sentiment === "BEARISH" ? "bg-red-500/10 text-red-400" :
                      "bg-gray-500/10 text-gray-400"
                    }`}>
                      {item.sentiment}
                    </span>
                  </div>
                  <a href={item.link} target="_blank" rel="noreferrer" className="block">
                    <h4 className="text-xs font-bold text-white leading-relaxed hover:text-brand-green">{item.title}</h4>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
