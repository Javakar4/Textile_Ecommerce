import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../config/constants';

export const catalogService = {
  // PRODUCTS
  async getProducts(filters = {}) {
    const params = {
      limit: 100, // Load enough for simple dashboard view
    };
    if (filters.search) params.search = filters.search;
    if (filters.category && filters.category !== 'all') params.category = filters.category;
    // Client-side stock filtering can still be applied if desired, or min/max price
    return axiosClient.get(API_ENDPOINTS.PRODUCTS, { params });
  },

  async getProductById(productId) {
    return axiosClient.get(`${API_ENDPOINTS.PRODUCTS}/${productId}`);
  },

  async createProduct(productData) {
    return axiosClient.post(API_ENDPOINTS.PRODUCTS, productData);
  },

  async updateProduct(productId, productData) {
    return axiosClient.put(`${API_ENDPOINTS.PRODUCTS}/${productId}`, productData);
  },

  async deleteProduct(productId) {
    return axiosClient.delete(`${API_ENDPOINTS.PRODUCTS}/${productId}`);
  },

  // CATEGORIES
  async getCategories() {
    return axiosClient.get(API_ENDPOINTS.CATEGORIES);
  },

  async getCategoryById(categoryId) {
    return axiosClient.get(`${API_ENDPOINTS.CATEGORIES}/${categoryId}`);
  },

  async createCategory(categoryData) {
    return axiosClient.post(API_ENDPOINTS.CATEGORIES, categoryData);
  },

  async updateCategory(categoryId, categoryData) {
    return axiosClient.patch(`${API_ENDPOINTS.CATEGORIES}/${categoryId}`, categoryData);
  },

  async deleteCategory(categoryId) {
    return axiosClient.delete(`${API_ENDPOINTS.CATEGORIES}/${categoryId}`);
  }
};
