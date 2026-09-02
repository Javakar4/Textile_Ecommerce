import api from "../utils/axios";
import apiEndpoints from "../config/constants";

const orderService = {
  createOrder: async (data) => {
    try {
      const response = await api.post(apiEndpoints.ORDERS.CREATE, data);
      return { ok: true, data: response.data, redirectUrl: response.redirectUrl };
    } catch (error) {
      console.error("Create order error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to create order",
      };
    }
  },

  getMyOrders: async (page = 1, limit = 5) => {
    try {
      const response = await api.get(`${apiEndpoints.ORDERS.BASE}?page=${page}&limit=${limit}`);
      // axios interceptor already returns response.data, so 'response' here is { success, data, pagination }
      return { ok: true, data: response?.data || [], pagination: response?.pagination };
    } catch (error) {
      console.error("Get my orders error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch orders",
      };
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await api.get(`${apiEndpoints.ORDERS.BASE}/${id}`);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Get order by ID error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch order",
      };
    }
  },

  updatePaymentStatus: async (data) => {
    try {
      const response = await api.patch(apiEndpoints.ORDERS.PAYMENT, data);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Update payment status error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to update payment status",
      };
    }
  },

  updateTrackingStatus: async (data) => {
    try {
      const response = await api.patch(apiEndpoints.ORDERS.TRACKING, data);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Update tracking status error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to update tracking status",
      };
    }
  },
};


export default orderService;
