"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const market_controller_1 = require("../controllers/market.controller");
const router = (0, express_1.Router)();
router.get("/", market_controller_1.getMarketTicker);
router.get("/news", market_controller_1.getMarketNews);
router.get("/indices", market_controller_1.getMarketIndices);
exports.default = router;
