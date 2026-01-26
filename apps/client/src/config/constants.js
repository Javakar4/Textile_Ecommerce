import React from "react";
export const constants = {
  cartMock: [
    {
      name: "Organic Cotton Canvas",
      sku: "OCC-001-NAT",
      color: "Natural Beige",
      material: "100% Organic Cotton",
      pattern: "Solid",
      price: 28.99,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=200&h=200&fit=crop",
    },
    {
      name: "Premium Linen Blend",
      sku: "PLB-045-GRY",
      color: "Charcoal Gray",
      material: "70% Linen, 30% Cotton",
      pattern: "Herringbone",
      price: 42.5,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea1f1d58?w=200&h=200&fit=crop",
    },
    {
      name: "Silk Dupioni",
      sku: "SDK-128-BUR",
      color: "Burgundy",
      material: "100% Pure Silk",
      pattern: "Textured",
      price: 56.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200&h=200&fit=crop",
    },
  ],
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const apiEndpoints = {
  NODE_ENV: import.meta.env.MODE,
  BASE_URL,
  AUTH: {
    SIGNUP: `/api/v1/auth/signup`,
    LOGIN: `/api/v1/auth/login`,
    VERIFY_OTP: `/api/v1/auth/verify-otp`,
    RESEND_OTP: `/api/v1/auth/resend-otp`,
    FORGOT_PASSWORD: `/api/v1/auth/forgot-password`,
    RESET_PASSWORD: `/api/v1/auth/reset-password`,
  },
  CART: {
    ADD: `/api/v1/cart/add`,
    GET: `/api/v1/cart/`,
    UPDATE_ITEM: `/api/v1/cart/item`,
    REMOVE_ITEM: `/api/v1/cart/item`,
    CLEAR: `/api/v1/cart/`,
    SYNC: `/api/v1/cart/sync`,
  },
  PROFILE: {
    GET: `/api/v1/profile`,
    UPDATE: `/api/v1/profile`,
    ADDRESS: `/api/v1/profile/address`,
  },
};

export default apiEndpoints;
