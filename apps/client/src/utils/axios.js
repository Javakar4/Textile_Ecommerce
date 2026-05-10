import axios from "axios";
import toastUtils from "./toastUtils";
import apiEndpoints from "@config/constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || apiEndpoints.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request info
    console.log("[API REQUEST]", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });

    return config;
  },
  (error) => {
    console.error("[API REQUEST ERROR]", error);
    toastUtils.error("Request setup error");
    return Promise.reject(error);
  },
);

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Log response info
    console.log("[API RESPONSE]", {
      url: response.config.url,
      method: response.config.method,
      data: response.data,
      status: response.status,
    });

    // Optional: show toast for successful responses
    if (response.data?.message && response.config.method!=="get") {
      toastUtils.success(response.data.message);
    }

    return response.data;
  },
  (error) => {
    let message = "Something went wrong";

    // Server responded with error
    if (error.response) {
      message =
        error.response.data?.message ||
        error.response.data?.error ||
        `Request failed with status ${error.response.status}`;

      if (error.response.status === 503) {
        window.location.href = "/maintenance";
        return new Promise(() => {}); // Stop further processing
      }

      console.error("[API RESPONSE ERROR]", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response.status,
        data: error.response.data,
      });
    }
    // Request sent but no response
    else if (error.request) {
      if (error.code === "ECONNABORTED") {
        message = "Request timed out. Please try again.";
      } else if (error.message === "Network Error") {
        message = "Network error. Please check your internet connection or server status.";
      } else {
        message = "Server unreachable. Please check your connection.";
      }
      console.error("[API NO RESPONSE]", error.request);
    }
    // Something else happened
    else {
      message = error.message || "Unexpected error occurred";
      console.error("[API ERROR]", message, error);
    }

    // show toast for errors
    toastUtils.error(message);

    // Return error with parsed message for component usage
    return Promise.reject({
      ...error,
      parsedMessage: message,
    });
  },
);

export default api;
