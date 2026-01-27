import Order from "../models/OrderSchema.js";
import Cart from "../models/CartSchema.js"; // assuming you have this
import mongoose from "mongoose";

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
            paymentStatus: paymentMethod === "COD" ? "Pending" : "Confirmed",
            shippingAddress
        });

        // Clear cart after successful order
        await Cart.findOneAndUpdate(
            { userId },
            { $set: { items: [] } }
        );

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order
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
