"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const leads_controller_1 = require("../controllers/leads.controller");
const router = (0, express_1.Router)();
// Public submission
router.post("/", leads_controller_1.createLead);
// Admin-only monitoring
router.get("/", auth_middleware_1.authenticateJWT, auth_middleware_1.requireAdmin, leads_controller_1.getLeads);
router.put("/:id/read", auth_middleware_1.authenticateJWT, auth_middleware_1.requireAdmin, leads_controller_1.markLeadAsRead);
router.delete("/:id", auth_middleware_1.authenticateJWT, auth_middleware_1.requireAdmin, leads_controller_1.deleteLead);
exports.default = router;
