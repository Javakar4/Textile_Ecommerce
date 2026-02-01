import api from "../utils/axios";
import apiEndpoints from "../config/constants";

const productService = {
  getAllProducts: async (params = {}) => {
    try {
      // Params can include search, filters, pagination
      const response = await api.get(apiEndpoints.PRODUCTS.BASE, { params });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Get all products error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch products",
      };
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`${apiEndpoints.PRODUCTS.BASE}/${id}`);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Get product by ID error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch product",
      };
    }
  },

};


export default productService;
