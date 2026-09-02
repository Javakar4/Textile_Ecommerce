import api from "../utils/axios";
import apiEndpoints from "../config/constants";

const wishlistService = {
  getWishlist: async ({ page = 1, limit = 8 } = {}) => {
    try {
      const response = await api.get(apiEndpoints.WISHLIST.BASE, {
        params: { page, limit },
      });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Get wishlist error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch wishlist",
      };
    }
  },

  // Fetch all items (no pagination) — used by the context for isInWishlist checks
  getAllWishlistIds: async () => {
    try {
      const response = await api.get(apiEndpoints.WISHLIST.BASE, {
        params: { page: 1, limit: 9999 },
      });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Get all wishlist error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch wishlist",
      };
    }
  },

  addToWishlist: async (productId) => {
    try {
      const response = await api.post(apiEndpoints.WISHLIST.ADD, { productId });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Add to wishlist error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to add to wishlist",
      };
    }
  },

  removeFromWishlist: async (productId) => {
    try {
      const response = await api.delete(
        `${apiEndpoints.WISHLIST.REMOVE}/${productId}`
      );
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Remove from wishlist error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to remove from wishlist",
      };
    }
  },

  clearWishlist: async () => {
    try {
      const response = await api.delete(apiEndpoints.WISHLIST.CLEAR);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Clear wishlist error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to clear wishlist",
      };
    }
  },
};

export default wishlistService;
