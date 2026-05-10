import mongoose from "mongoose";
import { wishlistService } from "../services/wishlistService.js";
import { emitEvent } from "../config/socket.js";

const rtnRes = (res, code, message, data = null) =>
    res.status(code).json({ success: code < 400, message, data });

export const getWishlist = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return rtnRes(res, 401, "Unauthorized");

        const result = await wishlistService.getWishlist(userId);
        return rtnRes(res, 200, "Wishlist fetched", result.data);
    } catch (err) {
        console.error("getWishlist error:", err);
        return rtnRes(res, 500, "Failed to fetch wishlist");
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { productId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return rtnRes(res, 400, "Invalid product id");
        }

        const result = await wishlistService.addToWishlist(userId, productId);
        if (!result.ok) return rtnRes(res, 400, result.message);

        emitEvent("wishlist_updated", { userId });
        return rtnRes(res, 200, "Product added to wishlist");
    } catch (err) {
        console.error("addToWishlist error:", err);
        return rtnRes(res, 500, "Failed to add product");
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return rtnRes(res, 400, "Invalid product id");
        }

        const result = await wishlistService.removeFromWishlist(userId, productId);
        if (!result.ok) return rtnRes(res, 404, result.message);

        emitEvent("wishlist_updated", { userId });
        return rtnRes(res, 200, "Product removed from wishlist");
    } catch (err) {
        console.error("removeFromWishlist error:", err);
        return rtnRes(res, 500, "Failed to remove product");
    }
};

export const clearWishlist = async (req, res) => {
    try {
        const userId = req.user?.userId;
        await wishlistService.clearWishlist(userId);

        emitEvent("wishlist_updated", { userId });
        return rtnRes(res, 200, "Wishlist cleared");
    } catch (err) {
        console.error("clearWishlist error:", err);
        return rtnRes(res, 500, "Failed to clear wishlist");
    }
};
