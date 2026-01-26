import * as cartService from "../services/cartService.js";
import { rtnRes } from "../utils/responseHandlerService.js";

/**
 * Sync guest cart (placeholder logic for now).
 */
export const syncCart = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { guestItems } = req.body;

    if (!userId) {
      return rtnRes(res, 401, "User not authenticated");
    }

    const result = await cartService.syncGuestCart(userId, guestItems || []);
    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Sync failed");
    }

    return rtnRes(res, 200, "Cart synced successfully");
  } catch (err) {
    console.error("syncCart controller error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

/**
 * Add item to cart.
 */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { productId, quantity, price, size, color, name, image } = req.body;

    if (!userId) {
      return rtnRes(res, 401, "User authentication required");
    }
    if (!productId || !quantity || !price) {
      return rtnRes(res, 400, "Missing product details");
    }

    const result = await cartService.addToCart(userId, {
      productId,
      quantity,
      price,
      size,
      color,
      name,
      image,
    });
    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Add to cart failed");
    }

    return rtnRes(res, 200, "Item added to cart");
  } catch (err) {
    console.error("addToCart controller error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

/**
 * Get user's cart.
 */
export const getCart = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return rtnRes(res, 401, "User authentication required");
    }

    const result = await cartService.getCart(userId);
    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Fetch cart failed");
    }

    return rtnRes(res, 200, "Cart fetched successfully", result.data);
  } catch (err) {
    console.error("getCart controller error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

/**
 * Update item quantity in cart.
 */
export const updateItem = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { productId, quantity, size, color } = req.body;

    if (!userId) return rtnRes(res, 401, "User authentication required");
    if (!productId || quantity === undefined)
      return rtnRes(res, 400, "Missing parameters");

    const result = await cartService.updateItemQuantity(
      userId,
      productId,
      quantity,
      size,
      color,
    );
    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Update failed");
    }
    return rtnRes(res, 200, "Cart updated");
  } catch (err) {
    console.error("updateItem controller error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

/**
 * Remove item from cart.
 */
export const removeItem = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { productId, size, color } = req.body;

    if (!userId) return rtnRes(res, 401, "User authentication required");
    if (!productId) return rtnRes(res, 400, "Product ID required");

    const result = await cartService.removeItem(userId, productId, size, color);
    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Remove failed");
    }
    return rtnRes(res, 200, "Item removed");
  } catch (err) {
    console.error("removeItem controller error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

/**
 * Clear user's cart.
 */
export const clearCart = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) return rtnRes(res, 401, "User authentication required");

    const result = await cartService.clearCart(userId);
    if (!result.ok) {
      return rtnRes(res, 500, result.message || "Clear failed");
    }
    return rtnRes(res, 200, "Cart cleared");
  } catch (err) {
    console.error("clearCart controller error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};
