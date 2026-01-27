import express from "express";
import * as orderController from "../controllers/orderController.js";
import { authenticateToken } from "../middlewares/authenticator.js";

const router = express.Router();

// Order routes (requires login)
router.post("/create", authenticateToken, orderController.createOrder);
router.get("/", authenticateToken, orderController.getMyOrders);
router.get("/:orderId", authenticateToken, orderController.getOrderById);

// Admin-only routes (optional)
// You can add admin middleware if needed
router.patch("/payment", authenticateToken, orderController.updatePaymentStatus);
router.patch("/tracking", authenticateToken, orderController.updateTrackingStatus);

export default router;
