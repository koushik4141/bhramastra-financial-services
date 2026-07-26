import { Request, Response } from "express";
import Parser from "rss-parser";
import yahooFinance from "yahoo-finance2";

const parser = new Parser();

export async function getMarketNews(req: Request, res: Response) {
  try {
    // Moneycontrol Top News RSS
    const feed = await parser.parseURL("https://www.moneycontrol.com/rss/MCtopnews.xml");
    
    const news = feed.items.slice(0, 8).map((item: any, index: number) => {
      // Determine sentiment based on keywords
      const titleLower = item.title?.toLowerCase() || "";
      let sentiment = "NEUTRAL";
      if (titleLower.match(/surge|jump|rise|gain|bull|high|up|profit|buy|strong/)) {
        sentiment = "BULLISH";
      } else if (titleLower.match(/fall|drop|plunge|crash|bear|low|down|loss|sell|weak|warn/)) {
        sentiment = "BEARISH";
      }

      return {
        id: `news_${index}`,
        title: item.title,
        link: item.link,
        source: "Moneycontrol",
        time: item.pubDate,
        sentiment
      };
    });

    res.status(200).json(news);
  } catch (error: any) {
    console.error("News fetch error:", error);
    res.status(500).json({ error: "Failed to fetch real-time news" });
  }
}

export async function getMarketIndices(req: Request, res: Response) {
  try {
    const symbols = [
      { sym: "^NSEI", name: "NIFTY 50" },
      { sym: "^NSEBANK", name: "BANK NIFTY" },
      { sym: "^BSESN", name: "SENSEX" }
    ];

    const results = await Promise.all(
      symbols.map(async (s) => {
        try {
          const quote = await yahooFinance.quote(s.sym) as any;
          const value = quote.regularMarketPrice || 0;
          const change = quote.regularMarketChange || 0;
          const pct = quote.regularMarketChangePercent || 0;
          return {
            name: s.name,
            value: parseFloat(value.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            pct: parseFloat(pct.toFixed(2))
          };
        } catch (e) {
          // Fallback if quote fails
          return {
            name: s.name,
            value: 0,
            change: 0,
            pct: 0
          };
        }
      })
    );

    res.status(200).json(results);
  } catch (error: any) {
    console.error("Indices fetch error:", error);
    res.status(500).json({ error: "Failed to fetch real-time indices" });
  }
}

import { getMarketTickerData } from "../services/market.service";

export async function getMarketTicker(req: Request, res: Response) {
  try {
    const data = await getMarketTickerData();
    if (!data.success) {
      return res.status(503).json(data);
    }
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Ticker fetch error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
