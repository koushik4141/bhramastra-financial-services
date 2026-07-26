import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { createOrder, verifyPayment } from "../controllers/payments.controller";

const router = Router();

router.post("/create-order", authenticateJWT, createOrder);
router.post("/verify-payment", authenticateJWT, verifyPayment);

export default router;
