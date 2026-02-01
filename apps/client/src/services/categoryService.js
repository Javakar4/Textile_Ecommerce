import api from "../utils/axios";
import apiEndpoints from "../config/constants";

const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await api.get(apiEndpoints.CATEGORIES.BASE);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Get all categories error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch categories",
      };
    }
  },

  getCategoryById: async (id) => {
    try {
      const response = await api.get(`${apiEndpoints.CATEGORIES.BASE}/${id}`);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Get category by ID error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch category",
      };
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await api.post(
        apiEndpoints.CATEGORIES.BASE,
        categoryData,
      );
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Create category error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to create category",
      };
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const response = await api.patch(
        `${apiEndpoints.CATEGORIES.BASE}/${id}`,
        categoryData,
      );
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Update category error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to update category",
      };
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await api.delete(
        `${apiEndpoints.CATEGORIES.BASE}/${id}`,
      );
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Delete category error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to delete category",
      };
    }
  },
};

export default categoryService;
