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

};

export default brandService;
