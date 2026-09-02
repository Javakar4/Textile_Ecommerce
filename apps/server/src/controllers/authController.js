import { authService } from "../services/authService.js";
import { rtnRes } from "../utils/responseHandlerService.js";
import { config } from "../config/config.js";
import User from "../models/UserSchema.js";
import Address from "../models/AddressSchema.js";
import Order from "../models/OrderSchema.js";

/**
 * Handle user signup.
 */
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return rtnRes(
        res,
        400,
        "All fields (name, email, password) are required.",
      );
    }

    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const result = await authService.signup(name, email, password, ip);

    if (!result.ok) {
      return rtnRes(res, result.statusCode || 400, result.message);
    }

    return rtnRes(res, 200, result.message, {
      warning: result.warning || false
    });


    if (!result.ok && result.message.includes("registered")) {
      return rtnRes(res, 200, result.message);
    }

  } catch (error) {
    console.error("Signup Controller Error:", error);
    return rtnRes(res, 500, "An internal server error occurred during signup.");
  }
};

/**
 * Handle user login.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return rtnRes(res, 400, "Email and password are required.");
    }

    const result = await authService.login(email, password);
    if (!result.ok) {
      return rtnRes(
        res,
        result.statusCode || 401,
        result.message,
        result.unverified ? { unverified: true } : null,
      );
    }

    return rtnRes(res, 200, result.message, result.data);
  } catch (error) {
    console.error("Login Controller Error:", error);
    return rtnRes(res, 500, "An internal server error occurred during login.");
  }
};

/**
 * Handle OTP verification.
 */
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return rtnRes(res, 400, "Email and OTP code are required.");
    }

    const result = await authService.verifyOtp(email, otp);
    if (!result.ok) {
      return rtnRes(res, result.statusCode || 400, result.message);
    }

    return rtnRes(res, 200, result.message);
  } catch (error) {
    console.error("Verify OTP Controller Error:", error);
    return rtnRes(
      res,
      500,
      "An internal server error occurred during OTP verification.",
    );
  }
};

/**
 * Handle resending OTP.
 */
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return rtnRes(res, 400, "Email is required to resend OTP.");
    }

    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const result = await authService.resendOtp(email, ip);

    if (!result.ok) {
      return rtnRes(res, result.statusCode || 400, result.message);
    }

    return rtnRes(res, 200, result.message);
  } catch (error) {
    console.error("Resend OTP Controller Error:", error);
    return rtnRes(
      res,
      500,
      "An internal server error occurred during resending OTP.",
    );
  }
};

/**
 * Handle forgot password.
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return rtnRes(res, 400, "Email is required.");
    }

    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const result = await authService.forgotPassword(email, ip);

    if (!result.ok) {
      return rtnRes(res, result.statusCode || 400, result.message);
    }

    return rtnRes(res, 200, result.message);
  } catch (error) {
    console.error("Forgot Password Controller Error:", error);
    return rtnRes(res, 500, "An internal server error occurred.");
  }
};

/**
 * Handle reset password.
 */
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return rtnRes(res, 400, "Email, OTP, and new password are required.");
    }

    const result = await authService.resetPassword(email, otp, newPassword);

    if (!result.ok) {
      return rtnRes(res, result.statusCode || 400, result.message);
    }

    return rtnRes(res, 200, result.message);
  } catch (error) {
    console.error("Reset Password Controller Error:", error);
    return rtnRes(res, 500, "An internal server error occurred.");
  }
};

const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
       return rtnRes(res, 401, "Google authentication failed.");
    }

    const result = await authService.googleLogin(req.user);

    if (!result.ok) {
     // Redirect to client with error
      return res.redirect(`${config.CLIENT_BASE_URL}/auth?error=${encodeURIComponent(result.message)}`);
    }
    
    // Redirect to client with token
    const token = result.data.token;
    res.redirect(`${config.CLIENT_BASE_URL}/auth/callback?token=${token}`);

  } catch (error) {
    console.error("Google Callback Controller Error:", error);
    res.redirect(`${config.CLIENT_BASE_URL}/auth?error=Server error`);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { search, role, status } = req.query;
    const query = {};

    if (role) query.role = role;
    if (status) query.status = status;

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query).select("-passwordHash").sort({ createdAt: -1 });

    return rtnRes(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    console.error("getAllUsers Error:", error);
    return rtnRes(res, 500, "An internal server error occurred retrieving users.");
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-passwordHash");
    if (!user) {
      return rtnRes(res, 404, "User not found.");
    }

    const addresses = await Address.find({ userId });
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return rtnRes(res, 200, "User details retrieved successfully", {
      user,
      addresses,
      orders,
    });
  } catch (error) {
    console.error("getUserDetails Error:", error);
    return rtnRes(res, 500, "An internal server error occurred retrieving user details.");
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return rtnRes(res, 400, "Invalid status. Must be 'active' or 'inactive'.");
    }

    const user = await User.findByIdAndUpdate(userId, { status }, { new: true }).select("-passwordHash");
    if (!user) {
      return rtnRes(res, 404, "User not found.");
    }

    return rtnRes(res, 200, "User status updated successfully", user);
  } catch (error) {
    console.error("updateUserStatus Error:", error);
    return rtnRes(res, 500, "An internal server error occurred updating user status.");
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return rtnRes(res, 400, "Invalid role. Must be 'admin' or 'user'.");
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select("-passwordHash");
    if (!user) {
      return rtnRes(res, 404, "User not found.");
    }

    return rtnRes(res, 200, "User role updated successfully", user);
  } catch (error) {
    console.error("updateUserRole Error:", error);
    return rtnRes(res, 500, "An internal server error occurred updating user role.");
  }
};

export default {
  signup,
  login,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  googleCallback,
  getAllUsers,
  getUserDetails,
  updateUserStatus,
  updateUserRole,
};
