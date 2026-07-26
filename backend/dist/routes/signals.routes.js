"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const signals_controller_1 = require("../controllers/signals.controller");
const router = (0, express_1.Router)();
// GET signals is accessible to logged in users (masked if not subscribed)
router.get("/", auth_middleware_1.authenticateJWT, signals_controller_1.getSignals);
// Admin-only CRUD operations
router.post("/", auth_middleware_1.authenticateJWT, auth_middleware_1.requireAdmin, signals_controller_1.createSignal);
router.put("/:id", auth_middleware_1.authenticateJWT, auth_middleware_1.requireAdmin, signals_controller_1.updateSignal);
router.delete("/:id", auth_middleware_1.authenticateJWT, auth_middleware_1.requireAdmin, signals_controller_1.deleteSignal);
exports.default = router;
