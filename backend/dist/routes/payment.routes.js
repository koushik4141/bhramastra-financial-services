"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const payments_controller_1 = require("../controllers/payments.controller");
const router = (0, express_1.Router)();
router.post("/create-order", auth_middleware_1.authenticateJWT, payments_controller_1.createOrder);
router.post("/verify-payment", auth_middleware_1.authenticateJWT, payments_controller_1.verifyPayment);
exports.default = router;
