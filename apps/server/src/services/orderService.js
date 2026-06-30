import Order from "../models/Order.js";
import Cart from "../models/CartSchema.js";
import mongoose from "mongoose";

export const orderService = {

    /**
     * Create Order (Checkout)
     */
    async createOrder(userId, orderData) {
        try {
            const { items, total, paymentMethod, shippingAddress } = orderData;

            if (!items || !items.length || !total || !shippingAddress) {
                return { ok: false, statusCode: 400, message: "Missing order details" };
            }

            // Generate unique orderId
            const orderId = Date.now();

            const order = await Order.create({
                orderId,
                userId,
                items,
                total,
                paymentMethod,
                paymentStatus: "Initiated",
                shippingAddress
            });

            // Clear cart
            await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

            return { ok: true, data: order };
        } catch (err) {
            console.error("orderService.createOrder error:", err);
            return { ok: false, statusCode: 500, message: "Failed to create order" };
        }
    },

    /**
     * Get all orders of a user
     */
    async getMyOrders(userId) {
        try {
            const orders = await Order.find({ userId }).sort({ createdAt: -1 });
            return { ok: true, data: orders };
        } catch (err) {
            console.error("orderService.getMyOrders error:", err);
            return { ok: false, statusCode: 500, message: "Failed to fetch orders" };
        }
    },

    /**
     * Get a single order
     */
    async getOrderById(userId, orderId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                return { ok: false, statusCode: 400, message: "Invalid order id" };
            }

            const order = await Order.findOne({ _id: orderId, userId });
            if (!order) {
                return { ok: false, statusCode: 404, message: "Order not found" };
            }

            return { ok: true, data: order };
        } catch (err) {
            console.error("orderService.getOrderById error:", err);
            return { ok: false, statusCode: 500, message: "Failed to fetch order" };
        }
    },

    /**
     * Update payment status
     */
    async updatePaymentStatus(orderId, paymentStatus) {
        try {
            const order = await Order.findOne({ orderId });
            if (!order) {
                return { ok: false, statusCode: 404, message: "Order not found" };
            }

            order.paymentStatus = paymentStatus;
            await order.save();

            return { ok: true, message: "Payment status updated" };
        } catch (err) {
            console.error("orderService.updatePaymentStatus error:", err);
            return { ok: false, statusCode: 500, message: "Failed to update payment status" };
        }
    },

    /**
     * Update tracking status
     */
    async updateTrackingStatus(orderId, trackingStatus) {
        try {
            const order = await Order.findOne({ orderId });
            if (!order) {
                return { ok: false, statusCode: 404, message: "Order not found" };
            }

            order.trackingStatus = trackingStatus;
            await order.save();

            return { ok: true, message: "Tracking status updated" };
        } catch (err) {
            console.error("orderService.updateTrackingStatus error:", err);
            return { ok: false, statusCode: 500, message: "Failed to update tracking status" };
        }
    }
};
