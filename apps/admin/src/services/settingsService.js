import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../config/constants';

export const settingsService = {
  async changePassword(currentPassword, newPassword) {
    return axiosClient.put(`${API_ENDPOINTS.SETTINGS}/change-password`, {
      currentPassword,
      newPassword
    });
  },

  async getMaintenanceStatus() {
    return axiosClient.get(`${API_ENDPOINTS.SETTINGS}/maintenance`);
  },

  async toggleMaintenance(enabled) {
    return axiosClient.post(`${API_ENDPOINTS.SETTINGS}/maintenance`, {
      enabled
    });
  }
};
