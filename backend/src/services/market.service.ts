import YahooFinanceClass from "yahoo-finance2";
import NodeCache from "node-cache";

// Instantiate yahoo-finance2 v3 (requires `new` constructor)
const yahooFinance = new (YahooFinanceClass as any)({ suppressNotices: ["yahooSurvey"] });

// Cache for 30 seconds (reduced load on Yahoo Finance)
const cache = new NodeCache({ stdTTL: 30 });
const CACHE_KEY = "market_ticker_data";

export interface MarketTickerResponse {
  success: boolean;
  message?: string;
  lastUpdated?: string;
  data?: MarketTickerItem[];
  isFallback?: boolean;
}

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

const SYMBOL_MAP: Record<string, string> = {
  "^NSEI": "NIFTY 50",
  "^BSESN": "SENSEX",
  "^NSEBANK": "BANKNIFTY",
  "NIFTY_FIN_SERVICE.NS": "FINNIFTY",
  "NIFTY_MIDCAP_100.NS": "MIDCAP",
  "BSE-BANKEX.BO": "BANKEX",
  "GC=F": "GOLD",
  "SI=F": "SILVER",
  "CL=F": "CRUDE OIL",
  "INR=X": "USD/INR",
  "^IXIC": "NASDAQ",
  "^GSPC": "S&P 500",
  "^DJI": "DOW JONES",
  "BTC-USD": "BITCOIN",
  "ETH-USD": "ETHEREUM",
};

const SYMBOLS = Object.keys(SYMBOL_MAP);

/**
 * Realistic fallback data to display when Yahoo Finance is unavailable.
 * Values are approximate reference prices — updated periodically.
 */
const FALLBACK_DATA: MarketTickerItem[] = [
  { symbol: "^NSEI",               name: "NIFTY 50",   price: 24850.00,  change: 120.50,   changePercent: 0.49,  open: 24780.00, high: 24900.00, low: 24720.00, prevClose: 24729.50 },
  { symbol: "^BSESN",              name: "SENSEX",     price: 81550.00,  change: 380.00,   changePercent: 0.47,  open: 81250.00, high: 81700.00, low: 81100.00, prevClose: 81170.00 },
  { symbol: "^NSEBANK",            name: "BANKNIFTY",  price: 52400.00,  change: -145.00,  changePercent: -0.28, open: 52550.00, high: 52700.00, low: 52200.00, prevClose: 52545.00 },
  { symbol: "NIFTY_FIN_SERVICE.NS",name: "FINNIFTY",   price: 23550.00,  change: 75.00,    changePercent: 0.32,  open: 23500.00, high: 23620.00, low: 23440.00, prevClose: 23475.00 },
  { symbol: "NIFTY_MIDCAP_100.NS", name: "MIDCAP",     price: 58200.00,  change: 310.00,   changePercent: 0.54,  open: 57950.00, high: 58350.00, low: 57800.00, prevClose: 57890.00 },
  { symbol: "GC=F",                name: "GOLD",       price: 2380.50,   change: 8.20,     changePercent: 0.35,  open: 2375.00,  high: 2390.00,  low: 2370.00,  prevClose: 2372.30 },
  { symbol: "SI=F",                name: "SILVER",     price: 29.45,     change: 0.18,     changePercent: 0.61,  open: 29.30,    high: 29.65,    low: 29.20,    prevClose: 29.27 },
  { symbol: "CL=F",                name: "CRUDE OIL",  price: 82.30,     change: -0.45,    changePercent: -0.54, open: 82.80,    high: 83.10,    low: 82.00,    prevClose: 82.75 },
  { symbol: "INR=X",               name: "USD/INR",    price: 83.55,     change: 0.12,     changePercent: 0.14,  open: 83.45,    high: 83.68,    low: 83.40,    prevClose: 83.43 },
  { symbol: "^IXIC",               name: "NASDAQ",     price: 17850.00,  change: 95.00,    changePercent: 0.53,  open: 17760.00, high: 17910.00, low: 17720.00, prevClose: 17755.00 },
  { symbol: "^GSPC",               name: "S&P 500",    price: 5480.00,   change: 22.50,    changePercent: 0.41,  open: 5460.00,  high: 5495.00,  low: 5450.00,  prevClose: 5457.50 },
  { symbol: "^DJI",                name: "DOW JONES",  price: 39250.00,  change: 130.00,   changePercent: 0.33,  open: 39120.00, high: 39310.00, low: 39050.00, prevClose: 39120.00 },
  { symbol: "BTC-USD",             name: "BITCOIN",    price: 65400.00,  change: 850.00,   changePercent: 1.32,  open: 64600.00, high: 65800.00, low: 64200.00, prevClose: 64550.00 },
  { symbol: "ETH-USD",             name: "ETHEREUM",   price: 3480.00,   change: 55.00,    changePercent: 1.61,  open: 3430.00,  high: 3510.00,  low: 3400.00,  prevClose: 3425.00 },
];

/**
 * Delay helper for retry logic
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches quotes from Yahoo Finance directly.
 */
async function fetchFromYahoo(): Promise<MarketTickerItem[]> {
  const startTime = Date.now();
  console.log(`[MarketService] Fetching ${SYMBOLS.length} symbols from Yahoo Finance...`);

  // Fetch all symbols concurrently
  const quotesPromises = SYMBOLS.map(async (symbol) => {
    try {
      const res: any = await yahooFinance.quote(symbol);
      return res;
    } catch (e) {
      console.warn(`[MarketService] Failed to fetch quote for ${symbol}`);
      return null;
    }
  });

  const rawQuotes = await Promise.all(quotesPromises);
  const quotes: any[] = rawQuotes.filter((q) => q !== null);

  console.log(`[MarketService] Yahoo API responded in ${Date.now() - startTime}ms`);

  const results: MarketTickerItem[] = [];

  for (const quote of quotes) {
    if (!quote || !quote.symbol) continue;

    // Ignore results without basic price data to avoid malformed UI
    if (quote.regularMarketPrice === undefined || quote.regularMarketPrice === null) {
      console.warn(`[MarketService] Symbol ${quote.symbol} returned no price, skipping.`);
      continue;
    }

    results.push({
      symbol: quote.symbol,
      name: SYMBOL_MAP[quote.symbol] || quote.symbol,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChange || 0,
      changePercent: quote.regularMarketChangePercent || 0,
      open: quote.regularMarketOpen || quote.regularMarketPrice,
      high: quote.regularMarketDayHigh || quote.regularMarketPrice,
      low: quote.regularMarketDayLow || quote.regularMarketPrice,
      prevClose: quote.regularMarketPreviousClose || quote.regularMarketPrice,
    });
  }

  return results;
}

/**
 * Fetches market data with a robust caching, retry, and fallback mechanism.
 * Falls back to realistic static data when Yahoo Finance is unavailable.
 */
export async function getMarketTickerData(): Promise<MarketTickerResponse> {
  const requestStartTime = Date.now();

  // 1. Check cache first
  const cachedData = cache.get<MarketTickerItem[]>(CACHE_KEY);
  if (cachedData) {
    console.log(
      `[MarketService] Cache HIT. Request resolved in ${Date.now() - requestStartTime}ms`
    );
    return {
      success: true,
      lastUpdated: new Date().toISOString(),
      data: cachedData,
    };
  }

  console.log("[MarketService] Cache MISS. Initiating fetch...");

  // 2. Fetch with Retry Logic
  let fetchedData: MarketTickerItem[] | null = null;
  let attempt = 1;
  const MAX_ATTEMPTS = 2;

  while (attempt <= MAX_ATTEMPTS) {
    try {
      fetchedData = await fetchFromYahoo();
      break; // Success, exit retry loop
    } catch (error: any) {
      console.error(`[MarketService] Fetch attempt ${attempt} failed: ${error.message}`);

      if (attempt < MAX_ATTEMPTS) {
        console.log(`[MarketService] Retrying in 2 seconds...`);
        await delay(2000);
      }
      attempt++;
    }
  }

  // 3. Handle Results & Fallbacks
  if (fetchedData && fetchedData.length > 0) {
    // Success — cache and return live data
    cache.set(CACHE_KEY, fetchedData);
    console.log(
      `[MarketService] Data cached successfully. Total request time: ${Date.now() - requestStartTime}ms`
    );
    return {
      success: true,
      lastUpdated: new Date().toISOString(),
      data: fetchedData,
    };
  } else {
    // Yahoo Finance unavailable — return fallback data so the ticker still works
    console.warn(
      `[MarketService] Yahoo Finance unavailable. Returning fallback data. Total time: ${Date.now() - requestStartTime}ms`
    );

    // Cache fallback for a shorter period (60 seconds) to retry sooner
    cache.set(CACHE_KEY, FALLBACK_DATA, 60);

    return {
      success: true,
      isFallback: true,
      lastUpdated: new Date().toISOString(),
      data: FALLBACK_DATA,
    };
  }
}
