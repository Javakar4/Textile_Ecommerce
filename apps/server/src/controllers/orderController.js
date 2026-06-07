import Order from "../models/OrderSchema.js";
import Cart from "../models/CartSchema.js"; // assuming you have this
import mongoose from "mongoose";
import { emitEvent } from "../config/socket.js";
import paymentService from "../services/paymentService.js";
import { config } from "../config/config.js";

/**
 * Create Order (Checkout)
 * Cart ➜ Order ➜ Clear Cart
 */
export const createOrder = async (req, res) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User authentication required"
            });
        }

        const {
            items,
            total,
            paymentMethod,
            shippingAddress
        } = req.body;

        if (!items || !items.length || !total || !shippingAddress) {
            return res.status(400).json({
                success: false,
                message: "Missing order details"
            });
        }

        // Generate unique orderId (simple & safe)
        const orderId = Date.now();

        const order = await Order.create({
            orderId,
            userId,
            items,
            total,
            paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "Pending" : "Initiated",
            shippingAddress
        });

        // Clear cart after successful order
        await Cart.findOneAndUpdate(
            { userId },
            { $set: { items: [] } }
        );

        let redirectUrl = null;
        if (paymentMethod === "Online") {
            try {
                const paymentRes = await paymentService.initiatePayment({
                    amount: Math.round(total * 100),
                    merchantOrderId: `TX_${orderId}`,
                    redirectUrl: `${config.BACKEND_URL}/api/orders/payment/callback?orderId=${orderId}`,
                    phoneNumber: shippingAddress.phone || "9999999999"
                });

                // Extract redirect URL from PhonePe response
                redirectUrl = paymentRes?.redirectInfo?.url || 
                              paymentRes?.instrumentResponse?.redirectInfo?.url ||
                              paymentRes?.data?.redirectInfo?.url ||
                              paymentRes?.data?.instrumentResponse?.redirectInfo?.url ||
                              paymentRes?.url;
            } catch (err) {
                console.error("Payment initiation failed:", err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to initiate payment"
                });
            }
        }

        emitEvent("order_created", { userId });
        emitEvent("cart_updated", { userId });
        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order,
            redirectUrl
        });
    } catch (err) {
        console.error("createOrder error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to create order"
        });
    }
};

/**
 * Get all orders of logged-in user
 */
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (err) {
        console.error("getMyOrders error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });
    }
};

/**
 * Get single order details
 */
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user?.userId;

        // if (!mongoose.Types.ObjectId.isValid(orderId)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid order id"
        //     });
        // }

        const order = await Order.findOne({
            orderId: Number(orderId),
            userId
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        console.error("getOrderById error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch order"
        });
    }
};

/**
 * Update payment status (Admin / Payment Gateway callback)
 */
export const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId, paymentStatus } = req.body;

        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.paymentStatus = paymentStatus;
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Payment status updated"
        });
    } catch (err) {
        console.error("updatePaymentStatus error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to update payment status"
        });
    }
};

/**
 * Update tracking status (Admin)
 */
export const updateTrackingStatus = async (req, res) => {
    try {
        const { orderId, trackingStatus } = req.body;

        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.trackingStatus = trackingStatus;
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Tracking status updated"
        });
    } catch (err) {
        console.error("updateTrackingStatus error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to update tracking status"
        });
    }
};

/**
 * Payment Callback (From PhonePe)
 */
export const paymentCallback = async (req, res) => {
    try {
        const { orderId } = req.query;
        
        // PhonePe sends the transaction status in 'code' or inside a base64 'response'
        // For redirect callbacks it might send 'code' as query param or body param.
        const code = req.body?.code || req.query?.code || 'SUCCESS';
        
        if (orderId) {
            const order = await Order.findOne({ orderId: Number(orderId) });
            if (order) {
                // Determine payment status based on PhonePe code
                if (code === 'PAYMENT_SUCCESS' || code === 'SUCCESS') {
                    order.paymentStatus = 'Confirmed';
                } else {
                    order.paymentStatus = 'Failed';
                }
                await order.save();
            }
        }

        // Redirect to frontend result page
        const frontendUrl = `${config.CLIENT_BASE_URL}/payment/callback?status=${code}&orderId=${orderId}`;
        return res.redirect(frontendUrl);
    } catch (err) {
        console.error("paymentCallback error:", err);
        return res.redirect(`${config.CLIENT_BASE_URL}/payment/callback?status=ERROR`);
    }
};
