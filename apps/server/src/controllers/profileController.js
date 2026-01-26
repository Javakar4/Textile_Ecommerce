import User from "../models/userSchema.js";
import { rtnRes } from "../utils/responseHandlerService.js";
import ProfileService from "../services/profileService.js";
// import User from "../models/userSchema.js"

const getUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const result = await ProfileService.getProfile(userId);
    rtnRes(res, result.statusCode || 200, result.message, result.data);
  } catch (error) {
    console.error("Controller Error:", error);
    rtnRes(res, 500, "Internal error");
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const result = await ProfileService.updateProfile(userId, req.body);
    rtnRes(res, result.statusCode || 200, result.message, result.data);
  } catch (error) {
    console.error("Controller Error:", error);
    rtnRes(res, 500, "Internal error");
  }
};

const addAddress = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const result = await ProfileService.addAddress(userId, req.body);
    rtnRes(res, result.statusCode || 200, result.message, result.data);
  } catch (error) {
    console.error("Controller Error:", error);
    rtnRes(res, 500, "Internal error");
  }
};

const removeAddress = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: addressId } = req.params;
    const result = await ProfileService.removeAddress(userId, addressId);
    rtnRes(res, result.statusCode || 200, result.message, result.data);
  } catch (error) {
    console.error("Controller Error:", error);
    rtnRes(res, 500, "Internal error");
  }
};

const setDefaultAddress = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: addressId } = req.params;
    const result = await ProfileService.setDefaultAddress(userId, addressId);
    rtnRes(res, result.statusCode || 200, result.message, result.data);
  } catch (error) {
    console.error("Controller Error:", error);
    rtnRes(res, 500, "Internal error");
  }
};

export default {
  getUserProfile,
  updateUserProfile,
  addAddress,
  removeAddress,
  setDefaultAddress,
};
