import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../config/constants';

export const userService = {
  async getUsers(filters = {}) {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.role && filters.role !== 'all') params.role = filters.role;
    if (filters.status && filters.status !== 'all') params.status = filters.status;

    return axiosClient.get(API_ENDPOINTS.USERS, { params });
  },

  async getUserDetails(userId) {
    return axiosClient.get(`${API_ENDPOINTS.USERS}/${userId}`);
  },

  async updateUserStatus(userId, status) {
    return axiosClient.patch(`${API_ENDPOINTS.USERS}/${userId}/status`, { status });
  },

  async updateUserRole(userId, role) {
    return axiosClient.patch(`${API_ENDPOINTS.USERS}/${userId}/role`, { role });
  }
};
