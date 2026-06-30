import express from "express";
import * as orderController from "../controllers/orderController.js";
import { authenticateToken, requireAdmin } from "../middlewares/authenticator.js";

const router = express.Router();

// Order routes (requires login)
router.post("/create", authenticateToken, orderController.createOrder);
router.get("/", authenticateToken, orderController.getMyOrders);
router.get("/:orderId", authenticateToken, orderController.getOrderById);

// Payment callback (public, called by PhonePe)
router.all("/payment/callback", orderController.paymentCallback);

// S2S Webhook (public, called by PhonePe)
router.post("/webhook", orderController.webhookCallback);

// Admin-only routes
router.get("/admin/all", authenticateToken, requireAdmin, orderController.getAllOrders);
router.patch("/payment", authenticateToken, requireAdmin, orderController.updatePaymentStatus);
router.patch("/tracking", authenticateToken, requireAdmin, orderController.updateTrackingStatus);

export default router;
