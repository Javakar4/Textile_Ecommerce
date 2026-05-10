import * as cartService from "../services/cartService.js";
import { rtnRes } from "../utils/responseHandlerService.js";
import { emitEvent } from "../config/socket.js";

/**
 * Sync guest cart
 */
export const syncCart = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { guestItems = [] } = req.body;

    if (!userId) {
      return rtnRes(res, 401, "User not authenticated");
    }

    const result = await cartService.syncGuestCart(userId, guestItems);
    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Sync failed");
    }

    emitEvent("cart_updated", { userId });
    return rtnRes(res, 200, "Cart synced successfully");
  } catch (err) {
    console.error("syncCart error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

/**
 * Add item to cart
 */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const {
      productId,
      productCode,
      name,
      category,
      image,
      pricing,
      size,
      quantity = 1
    } = req.body;

    if (!userId) return rtnRes(res, 401, "User authentication required");

    if (
      !productId ||
      !productCode ||
      !name ||
      !category ||
      !image ||
      !pricing?.current ||
      !pricing?.original ||
      !pricing?.discount ||
      !pricing?.savings ||
      !size
    ) {
      return rtnRes(res, 400, "Missing product details");
    }

    const result = await cartService.addToCart(userId, {
      productId,
      productCode,
      name,
      category,
      image,
      pricing,
      size,
      quantity
    });

    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Add to cart failed");
    }

    emitEvent("cart_updated", { userId });
    return rtnRes(res, 200, "Item added to cart");
  } catch (err) {
    console.error("addToCart error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

/**
 * Get user's cart
 */
export const getCart = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) return rtnRes(res, 401, "User authentication required");

    const result = await cartService.getCart(userId);
    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Fetch cart failed");
    }

    return rtnRes(res, 200, "Cart fetched successfully", result.data);
  } catch (err) {
    console.error("getCart error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

/**
 * Update item quantity
 */
export const updateItem = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { productId, size, quantity } = req.body;

    if (!userId) return rtnRes(res, 401, "User authentication required");
    if (!productId || !size || quantity === undefined) {
      return rtnRes(res, 400, "Missing parameters");
    }

    const result = await cartService.updateItemQuantity(
      userId,
      productId,
      size,
      quantity
    );

    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Update failed");
    }

    emitEvent("cart_updated", { userId });
    return rtnRes(res, 200, "Cart updated");
  } catch (err) {
    console.error("updateItem error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

/**
 * Remove item from cart
 */
export const removeItem = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { productId, size } = req.body;

    if (!userId) return rtnRes(res, 401, "User authentication required");
    if (!productId || !size) {
      return rtnRes(res, 400, "Product ID and size required");
    }

    const result = await cartService.removeItem(userId, productId, size);
    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Remove failed");
    }

    emitEvent("cart_updated", { userId });
    return rtnRes(res, 200, "Item removed");
  } catch (err) {
    console.error("removeItem error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

/**
 * Clear cart
 */
export const clearCart = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) return rtnRes(res, 401, "User authentication required");

    const result = await cartService.clearCart(userId);
    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Clear failed");
    }

    emitEvent("cart_updated", { userId });
    return rtnRes(res, 200, "Cart cleared");
  } catch (err) {
    console.error("clearCart error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};
