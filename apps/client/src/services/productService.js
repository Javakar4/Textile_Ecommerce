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

  createProduct: async (data) => {
    try {
      const response = await api.post(apiEndpoints.PRODUCTS.BASE, data);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Create product error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to create product",
      };
    }
  },

  updateProduct: async (id, data) => {
    try {
      const response = await api.put(`${apiEndpoints.PRODUCTS.BASE}/${id}`, data);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Update product error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to update product",
      };
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`${apiEndpoints.PRODUCTS.BASE}/${id}`);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Delete product error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to delete product",
      };
    }
  },
};


export default productService;
