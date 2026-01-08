const { rtnRes } = require("../utils/responseHandlerService");
const { cartService } = require("../services/cartService");

module.exports = {

    async syncCart(req, res) {
        try {
            const userId = req.user?.id;
            const { guest_id } = req.body;

            if (!userId) {
                return rtnRes(res, 401, "User not authenticated");
            }
            if (!guest_id) {
                return rtnRes(res, 200, "No guest cart to sync");
            }

            const result = await cartService.syncGuestCart(userId, guest_id);
            if (!result.ok) {
                return rtnRes(res, 500, result.message || "Sync failed");
            }

            return rtnRes(res, 200, "Cart synced successfully");
        } catch (err) {
            console.error("syncCart controller error:", err);
            return rtnRes(res, 500, "Internal Server Error");
        }
    },

    async addToCart(req, res) {
        try {
            const userId = req.user?.id;
            const { guest_id, productId, quantity, price } = req.body;

            if (!userId && !guest_id) {
                return rtnRes(res, 400, "User ID or Guest ID required");
            }
            if (!productId || !quantity || !price) {
                return rtnRes(res, 400, "Missing product details");
            }

            const result = await cartService.addToCart(userId, guest_id, { productId, quantity, price });
            if (!result.ok) {
                return rtnRes(res, 500, result.message || "Add to cart failed");
            }

            return rtnRes(res, 200, "Item added to cart");
        } catch (err) {
            console.error("addToCart controller error:", err);
            return rtnRes(res, 500, "Internal Server Error");
        }
    },

    async getCart(req, res) {
        try {
            const userId = req.user?.id;
            const { guest_id } = req.query;

            if (!userId && !guest_id) {
                // Return empty if no identifier (or 400?) - Empty is safer/nicer
                return rtnRes(res, 200, "Cart fetched", { cart: [] });
            }

            const result = await cartService.getCart(userId, guest_id);
            if (!result.ok) {
                return rtnRes(res, 500, result.message || "Fetch cart failed");
            }

            return rtnRes(res, 200, "Cart fetched successfully", { cart: result.data });
        } catch (err) {
            console.error("getCart controller error:", err);
            return rtnRes(res, 500, "Internal Server Error");
        }
    },

    async updateItem(req, res) {
        try {
            const userId = req.user?.id;
            const { guest_id, productId, quantity } = req.body;

            if (!userId && !guest_id) return rtnRes(res, 400, "ID required");
            if (!productId || quantity === undefined) return rtnRes(res, 400, "Missing parameters");

            const result = await cartService.updateItemQuantity(userId, guest_id, productId, quantity);
            if (!result.ok) {
                return rtnRes(res, 500, result.message || "Update failed");
            }
            return rtnRes(res, 200, "Cart updated");
        } catch (err) {
            console.error("updateItem controller error:", err);
            return rtnRes(res, 500, "Internal Server Error");
        }
    },

    async removeItem(req, res) {
        try {
            const userId = req.user?.id;
            const { guest_id, productId } = req.body; // or params if route is /:id

            // Assuming body for simplicity as per plan
            if (!userId && !guest_id) return rtnRes(res, 400, "ID required");
            if (!productId) return rtnRes(res, 400, "Product ID required");

            const result = await cartService.removeItem(userId, guest_id, productId);
            if (!result.ok) {
                return rtnRes(res, 500, result.message || "Remove failed");
            }
            return rtnRes(res, 200, "Item removed");
        } catch (err) {
            console.error("removeItem controller error:", err);
            return rtnRes(res, 500, "Internal Server Error");
        }
    },

    async clearCart(req, res) {
        try {
            const userId = req.user?.id;
            const { guest_id } = req.body;

            if (!userId && !guest_id) return rtnRes(res, 400, "ID required");

            const result = await cartService.clearCart(userId, guest_id);
            if (!result.ok) {
                return rtnRes(res, 500, result.message || "Clear failed");
            }
            return rtnRes(res, 200, "Cart cleared");
        } catch (err) {
            console.error("clearCart controller error:", err);
            return rtnRes(res, 500, "Internal Server Error");
        }
    }
};
