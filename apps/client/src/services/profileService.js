import api from "../utils/axios";
import apiEndpoints from "../config/constants";

const profileService = {
  /**
   * Get user profile and addresses
   */
  getProfile: async () => {
    try {
      const response = await api.get(apiEndpoints.PROFILE.GET);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Get Profile error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to fetch profile",
      };
    }
  },

  /**
   * Update user profile information
   * @param {Object} data - { name, phone, avatar, ... }
   */
  updateProfile: async (data) => {
    try {
      const response = await api.put(apiEndpoints.PROFILE.UPDATE, data);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Update Profile error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to update profile",
      };
    }
  },

  /**
   * Add a new address
   * @param {Object} data
   */
  addAddress: async (data) => {
    try {
      const response = await api.post(apiEndpoints.PROFILE.ADDRESS, data);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Add Address error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to add address",
      };
    }
  },

  /**
   * Remove an address by ID
   * @param {string} id
   */
  removeAddress: async (id) => {
    try {
      const response = await api.delete(
        `${apiEndpoints.PROFILE.ADDRESS}/${id}`,
      );
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Remove Address error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to remove address",
      };
    }
  },

  /**
   * Set default address
   * @param {string} id
   */
  setDefaultAddress: async (id) => {
    try {
      const response = await api.put(
        `${apiEndpoints.PROFILE.ADDRESS}/${id}/default`,
      );
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Set Default Address error:", error);
      return {
        ok: false,
        message:
          error.response?.data?.message || "Failed to set default address",
      };
    }
  },
};

export default profileService;
