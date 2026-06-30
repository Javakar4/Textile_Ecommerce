import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../config/constants';

export const authService = {
  async login(email, password) {
    const result = await axiosClient.post(API_ENDPOINTS.LOGIN, { email, password });
    
    // Ensure user is admin
    if (result.data?.user?.role !== 'admin') {
      throw new Error('Access denied: Not an administrator.');
    }
    
    localStorage.setItem('admin_token', result.data.token);
    localStorage.setItem('admin_user', JSON.stringify(result.data.user));
    return result.data;
  },

  logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  getUser() {
    const user = localStorage.getItem('admin_user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('admin_token') && !!localStorage.getItem('admin_user');
  }
};
