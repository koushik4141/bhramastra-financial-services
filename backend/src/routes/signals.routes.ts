import { Router } from "express";
import { authenticateJWT, requireAdmin } from "../middleware/auth.middleware";
import { getSignals, createSignal, updateSignal, deleteSignal } from "../controllers/signals.controller";

const router = Router();

// GET signals is accessible to logged in users (masked if not subscribed)
router.get("/", authenticateJWT, getSignals);

// Admin-only CRUD operations
router.post("/", authenticateJWT, requireAdmin, createSignal);
router.put("/:id", authenticateJWT, requireAdmin, updateSignal);
router.delete("/:id", authenticateJWT, requireAdmin, deleteSignal);

export default router;
