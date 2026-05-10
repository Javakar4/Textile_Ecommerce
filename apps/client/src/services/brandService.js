import api from "../utils/axios";
import apiEndpoints from "../config/constants";

const brandService = {
  getAllBrands: async () => {
    try {
      const response = await api.get(apiEndpoints.BRANDS.BASE);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Get all brands error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch brands",
      };
    }
  },

  getBrandById: async (id) => {
    try {
      const response = await api.get(`${apiEndpoints.BRANDS.BASE}/${id}`);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Get brand by ID error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch brand",
      };
    }
  },

  createBrand: async (data) => {
    try {
      const response = await api.post(apiEndpoints.BRANDS.BASE, data);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Create brand error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to create brand",
      };
    }
  },

  updateBrand: async (id, data) => {
    try {
      const response = await api.patch(`${apiEndpoints.BRANDS.BASE}/${id}`, data);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Update brand error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to update brand",
      };
    }
  },

  deleteBrand: async (id) => {
    try {
      const response = await api.delete(`${apiEndpoints.BRANDS.BASE}/${id}`);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Delete brand error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to delete brand",
      };
    }
  },
};

export default brandService;
