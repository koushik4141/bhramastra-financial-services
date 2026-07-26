import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import signalsRoutes from "./routes/signals.routes";
import leadsRoutes from "./routes/leads.routes";
import blogRoutes from "./routes/blog.routes";
import paymentRoutes from "./routes/payment.routes";
import adminRoutes from "./routes/admin.routes";
import marketRoutes from "./routes/market.routes";
import prisma from "./utils/prisma";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());

// CORS Setup — allow both port 3000 and 3001 (Next.js dev fallback)
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS policy"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Rate Limiter to guard server resources
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  message: { error: "Too many requests from this IP, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Health Check API
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/signals", signalsRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/market", marketRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled exception:", err.message || err);
  res.status(500).json({ error: "An internal server error occurred" });
});

// Seed Initial Configuration Data (Membership Plans and Testimonials)
async function seedDatabase() {
  try {
    const plansCount = await prisma.membershipPlan.count();
    if (plansCount === 0) {
      const planPrices = { BASIC: 999, PRO: 2999, ELITE: 5999 };
      const planNames = { BASIC: "Basic Plan", PRO: "Pro Plan", ELITE: "Elite Plan" };
      const features = {
        BASIC: ["Intraday Signals (1-2 daily)", "Telegram Alerts", "Basic Technical Analysis"],
        PRO: ["Intraday + Swing Signals", "Telegram Alerts", "Detailed Stock Reports", "Portfolio Guidance"],
        ELITE: ["All Signals (Intraday, Swing, Positional)", "Telegram + WhatsApp Alerts", "Full Portfolio Management Guidance", "1-on-1 Consultation Call"],
      };

      for (const tier of ["BASIC", "PRO", "ELITE"] as const) {
        await prisma.membershipPlan.create({
          data: {
            tier,
            name: planNames[tier],
            price: planPrices[tier],
            durationDays: 30,
            features: features[tier].join(", "),
          },
        });
      }
      console.log("Database seeded with default membership plans.");
    }

    const testimonialCount = await prisma.testimonial.count();
    if (testimonialCount === 0) {
      const testimonials = [
        {
          clientName: "Rahul Sharma",
          review: "Brahmastra's intraday advisory is extremely precise. I've seen a consistent 15% monthly growth in my active trading capital since joining the Pro Plan.",
          rating: 5,
          clientRole: "Active Trader",
          isFeatured: true,
        },
        {
          clientName: "Priya Patel",
          review: "Excellent support! The portfolio management guidance helped me restructure my mutual funds and equity holdings for maximum tax-efficient growth.",
          rating: 5,
          clientRole: "IT Professional & Part-time Investor",
          isFeatured: true,
        },
        {
          clientName: "Anand Verma",
          review: "SEBI compliance and transparency is what sets Brahmastra apart. Their trade signals always come with clear entry, target, and stop loss. No fake claims.",
          rating: 5,
          clientRole: "Swing Trader",
          isFeatured: true,
        },
      ];

      for (const item of testimonials) {
        await prisma.testimonial.create({ data: item });
      }
      console.log("Database seeded with sample customer testimonials.");
    }
  } catch (err) {
    console.error("Seeding warning:", err);
  }
}

// Start Server
app.listen(PORT, async () => {
  console.log(`Brahmastra API server running on port ${PORT}`);
  await seedDatabase();
});
