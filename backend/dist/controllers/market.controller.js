"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketNews = getMarketNews;
exports.getMarketIndices = getMarketIndices;
exports.getMarketTicker = getMarketTicker;
const rss_parser_1 = __importDefault(require("rss-parser"));
const yahoo_finance2_1 = __importDefault(require("yahoo-finance2"));
const parser = new rss_parser_1.default();
async function getMarketNews(req, res) {
    try {
        // Moneycontrol Top News RSS
        const feed = await parser.parseURL("https://www.moneycontrol.com/rss/MCtopnews.xml");
        const news = feed.items.slice(0, 8).map((item, index) => {
            // Determine sentiment based on keywords
            const titleLower = item.title?.toLowerCase() || "";
            let sentiment = "NEUTRAL";
            if (titleLower.match(/surge|jump|rise|gain|bull|high|up|profit|buy|strong/)) {
                sentiment = "BULLISH";
            }
            else if (titleLower.match(/fall|drop|plunge|crash|bear|low|down|loss|sell|weak|warn/)) {
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
    }
    catch (error) {
        console.error("News fetch error:", error);
        res.status(500).json({ error: "Failed to fetch real-time news" });
    }
}
async function getMarketIndices(req, res) {
    try {
        const symbols = [
            { sym: "^NSEI", name: "NIFTY 50" },
            { sym: "^NSEBANK", name: "BANK NIFTY" },
            { sym: "^BSESN", name: "SENSEX" }
        ];
        const results = await Promise.all(symbols.map(async (s) => {
            try {
                const quote = await yahoo_finance2_1.default.quote(s.sym);
                const value = quote.regularMarketPrice || 0;
                const change = quote.regularMarketChange || 0;
                const pct = quote.regularMarketChangePercent || 0;
                return {
                    name: s.name,
                    value: parseFloat(value.toFixed(2)),
                    change: parseFloat(change.toFixed(2)),
                    pct: parseFloat(pct.toFixed(2))
                };
            }
            catch (e) {
                // Fallback if quote fails
                return {
                    name: s.name,
                    value: 0,
                    change: 0,
                    pct: 0
                };
            }
        }));
        res.status(200).json(results);
    }
    catch (error) {
        console.error("Indices fetch error:", error);
        res.status(500).json({ error: "Failed to fetch real-time indices" });
    }
}
const market_service_1 = require("../services/market.service");
async function getMarketTicker(req, res) {
    try {
        const data = await (0, market_service_1.getMarketTickerData)();
        if (!data.success) {
            return res.status(503).json(data);
        }
        return res.status(200).json(data);
    }
    catch (error) {
        console.error("Ticker fetch error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
