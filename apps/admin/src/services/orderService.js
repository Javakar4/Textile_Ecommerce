import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../config/constants';

export const orderService = {
  async getAllOrders(filters = {}) {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.paymentStatus && filters.paymentStatus !== 'all') params.paymentStatus = filters.paymentStatus;
    if (filters.trackingStatus && filters.trackingStatus !== 'all') params.trackingStatus = filters.trackingStatus;

    return axiosClient.get(API_ENDPOINTS.ORDERS_ADMIN, { params });
  },

  async getOrderDetails(orderId) {
    return axiosClient.get(`${API_ENDPOINTS.ORDERS}/${orderId}`);
  },

  async updatePaymentStatus(orderId, paymentStatus) {
    return axiosClient.patch(`${API_ENDPOINTS.ORDERS}/payment`, { orderId, paymentStatus });
  },

  async updateTrackingStatus(orderId, trackingStatus) {
    return axiosClient.patch(`${API_ENDPOINTS.ORDERS}/tracking`, { orderId, trackingStatus });
  }
};
