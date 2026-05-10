import api from '../utils/axios';
import apiEndpoints from '../config/constants';

const apiCartService = {
    // Sync guest cart to user cart
    syncCart: async (guestId) => {
        try {
            const response = await api.post(apiEndpoints.CART.SYNC, { guest_id: guestId });
            return { ok: true, data: response.data };
        } catch (error) {
            console.error("Sync cart error:", error);
            return { ok: false, message: error.response?.data?.message || "Sync failed" };
        }
    },

    // Add item (supports guest via body, user via token in utils/axios)
    addToCart: async (item, guestId) => {
        try {
            // item should have { productId, quantity, price }
            const payload = { ...item, guest_id: guestId };
            const response = await api.post(apiEndpoints.CART.ADD, payload);
            return { ok: true, data: response.data };
        } catch (error) {
            console.error("Add to cart error:", error);
            return { ok: false, message: error.response?.data?.message || "Failed to add item" };
        }
    },

    // Get cart
    getCart: async (guestId) => {
        try {
            const params = guestId ? { guest_id: guestId } : {};
            const response = await api.get(apiEndpoints.CART.GET, { params });
            return { ok: true, data: response.data?.data?.cart || [] };
        } catch (error) {
            console.error("Get cart error:", error);
            // Return empty cart on error to prevent UI crash, or handle upstream
             return { ok: false, message: error.response?.data?.message || "Failed to fetch cart", data: [] };
        }
    },

    // Update item quantity
    updateItem: async (productId, quantity, guestId) => {
        try {
            const payload = { productId, quantity, guest_id: guestId };
            const response = await api.put(apiEndpoints.CART.UPDATE_ITEM, payload);
            return { ok: true, data: response.data };
        } catch (error) {
            console.error("Update item error:", error);
             return { ok: false, message: error.response?.data?.message || "Update failed" };
        }
    },

    // Remove item
    removeItem: async (productId, guestId) => {
        try {
            // DELETE with body requires slightly different axios syntax if checking guestId
            // api.delete(url, { data: payload })
            const payload = { productId, guest_id: guestId };
            const response = await api.delete(apiEndpoints.CART.REMOVE_ITEM, { data: payload });
            return { ok: true, data: response.data };
        } catch (error) {
            console.error("Remove item error:", error);
             return { ok: false, message: error.response?.data?.message || "Remove failed" };
        }
    },

    // Clear cart
    clearCart: async (guestId) => {
        try {
            const payload = { guest_id: guestId };
            const response = await api.delete(apiEndpoints.CART.CLEAR, { data: payload });
             return { ok: true, data: response.data };
        } catch (error) {
            console.error("Clear cart error:", error);
             return { ok: false, message: error.response?.data?.message || "Clear failed" };
        }
    }
};

export default apiCartService;
