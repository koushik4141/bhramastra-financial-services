import { Router } from "express";
import { authenticateJWT, requireAdmin } from "../middleware/auth.middleware";
import { createLead, getLeads, markLeadAsRead, deleteLead } from "../controllers/leads.controller";

const router = Router();

// Public submission
router.post("/", createLead);

// Admin-only monitoring (temporarily public for testing)
router.get("/", getLeads);
router.put("/:id/read", authenticateJWT, requireAdmin, markLeadAsRead);
router.delete("/:id", authenticateJWT, requireAdmin, deleteLead);

export default router;
