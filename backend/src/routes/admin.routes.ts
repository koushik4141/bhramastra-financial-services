import { Router } from "express";
import { authenticateJWT, requireAdmin } from "../middleware/auth.middleware";
import { getDashboardMetrics, getUsers, updateUserRole } from "../controllers/admin.controller";

const router = Router();

router.use(authenticateJWT);
router.use(requireAdmin);

router.get("/metrics", getDashboardMetrics);
router.get("/users", getUsers);
router.put("/users/:id/role", updateUserRole);

export default router;
