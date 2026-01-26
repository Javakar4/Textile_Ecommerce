import api from "../utils/axios";
import apiEndpoints from "../config/constants";

const authService = {
  /**
   * Signup a new user.
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */
  signup: async (name, email, password) => {
    try {
      const response = await api.post(apiEndpoints.AUTH.SIGNUP, {
        name,
        email,
        password,
      });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Signup failed",
      };
    }
  },

  /**
   * Verify OTP for a user.
   * @param {string} email
   * @param {string} otp
   */
  verifyOtp: async (email, otp) => {
    try {
      const response = await api.post(apiEndpoints.AUTH.VERIFY_OTP, {
        email,
        otp,
      });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Verify OTP error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Verification failed",
      };
    }
  },

  /**
   * Resend OTP.
   * @param {string} email
   */
  resendOtp: async (email) => {
    try {
      const response = await api.post(apiEndpoints.AUTH.RESEND_OTP, { email });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Resend OTP error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Resend failed",
      };
    }
  },

  /**
   * Login user.
   * @param {string} email
   * @param {string} password
   */
  login: async (email, password) => {
    try {
      const response = await api.post(apiEndpoints.AUTH.LOGIN, {
        email,
        password,
      });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Login error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  /**
   * Forgot password.
   * @param {string} email
   */
  forgotPassword: async (email) => {
    try {
      const response = await api.post(apiEndpoints.AUTH.FORGOT_PASSWORD, {
        email,
      });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Forgot password error:", error);
      return {
        ok: false,
        message:
          error.response?.data?.message || "Forgot password request failed",
      };
    }
  },

  /**
   * Reset password.
   * @param {string} email
   * @param {string} otp
   * @param {string} newPassword
   */
  resetPassword: async (email, otp, newPassword) => {
    try {
      const response = await api.post(apiEndpoints.AUTH.RESET_PASSWORD, {
        email,
        otp,
        newPassword,
      });
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        ok: false,
        message: error.response?.data?.message || "Reset password failed",
      };
    }
  },
};

export default authService;
