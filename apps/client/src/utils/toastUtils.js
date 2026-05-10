import { toast } from "react-hot-toast";

/**
 * Sanitizes backend error messages to be user-friendly.
 */
const sanitizeMessage = (message) => {
  if (!message) return "An unexpected error occurred";
  
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes("timeout")) {
    return "⌛ Request timed out. Please try again.";
  }
  
  if (lowerMsg.includes("network error") || lowerMsg.includes("unreachable") || lowerMsg.includes("check your connection")) {
    return "📡 Server unreachable. Please check your internet connection.";
  }
  
  // Replace long techy messages or stack traces
  if (message.includes("BSONError") || message.includes("MongoError") || message.length > 100) {
    return "⚠️ Database operation failed. Please try again later.";
  }
  
  return message;
};

export const toastUtils = {
  success: (message, options = {}) => {
    return toast.success(message || "Success!", {
      ...options,
    });
  },

  error: (message, options = {}) => {
    const cleanMsg = sanitizeMessage(message);
    return toast.error(cleanMsg, {
      ...options,
    });
  },

  loading: (message = "Loading...", options = {}) => {
    return toast.loading(message, {
      position: "top-center",
      ...options,
    });
  },

  promise: (promise, messages, options = {}) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading || "Processing...",
        success: (data) => messages.success || data?.message || "Success!",
        error: (err) => sanitizeMessage(messages.error || err?.parsedMessage || err?.message),
      },
      {
        position: "top-center",
        ...options,
      }
    );
  },

  warning: (message, options = {}) => {
    return toast(message, {
      icon: "⚠️",
      duration: 4000,
      position: "top-center",
      ...options,
    });
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },
};

export default toastUtils;
