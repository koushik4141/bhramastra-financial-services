import { Router } from "express";
import { getMarketNews, getMarketIndices, getMarketTicker } from "../controllers/market.controller";

const router = Router();

router.get("/", getMarketTicker);
router.get("/news", getMarketNews);
router.get("/indices", getMarketIndices);

export default router;
