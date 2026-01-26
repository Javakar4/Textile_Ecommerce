import User from "../models/userSchema.js";
import Address from "../models/AddressSchema.js";

const profileService = {
  getProfile: async (userId) => {
    try {
      const user = await User.findById(userId).select("-password -__v");
      if (!user) {
        return { ok: false, statusCode: 404, message: "User not found" };
      }

      const addresses = await Address.find({ userId }).select("-__v");

      return {
        ok: true,
        message: "Profile fetched successfully",
        data: { user, addresses },
      };
    } catch (error) {
      console.error("Error in getProfile:", error);
      return { ok: false, statusCode: 500, message: "Internal Server Error" };
    }
  },

  updateProfile: async (userId, updateData) => {
    try {
      const allowedUpdates = ["name", "phone", "avatar"];
      const updates = {};

      Object.keys(updateData).forEach((key) => {
        if (allowedUpdates.includes(key)) {
          updates[key] = updateData[key];
        }
      });

      const user = await User.findByIdAndUpdate(userId, updates, {
        new: true,
      }).select("-password -__v");

      if (!user) {
        return { ok: false, statusCode: 404, message: "User not found" };
      }

      return {
        ok: true,
        message: "Profile updated successfully",
        data: user,
      };
    } catch (error) {
      console.error("Error in updateProfile:", error);
      return { ok: false, statusCode: 500, message: "Internal Server Error" };
    }
  },

  addAddress: async (userId, addressData) => {
    try {
      if (addressData.isDefault) {
        // If new address is default, unset other defaults
        await Address.updateMany({ userId }, { isDefault: false });
      }

      const newAddress = new Address({ ...addressData, userId });
      await newAddress.save();

      const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

      return {
        ok: true,
        message: "Address added successfully",
        data: addresses,
      };
    } catch (error) {
      console.error("Error in addAddress:", error);
      if (error.name === "ValidationError") {
        return { ok: false, statusCode: 400, message: error.message };
      }
      return { ok: false, statusCode: 500, message: "Internal Server Error" };
    }
  },

  removeAddress: async (userId, addressId) => {
    try {
      const address = await Address.findOneAndDelete({
        _id: addressId,
        userId,
      });

      if (!address) {
        return { ok: false, statusCode: 404, message: "Address not found" };
      }

      const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

      return {
        ok: true,
        message: "Address removed successfully",
        data: addresses,
      };
    } catch (error) {
      console.error("Error in removeAddress:", error);
      return { ok: false, statusCode: 500, message: "Internal Server Error" };
    }
  },

  setDefaultAddress: async (userId, addressId) => {
    try {
      const address = await Address.findOne({ _id: addressId, userId });
      if (!address) {
        return { ok: false, statusCode: 404, message: "Address not found" };
      }

      // Unset all defaults
      await Address.updateMany({ userId }, { isDefault: false });

      // Set new default
      address.isDefault = true;
      await address.save();

      const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

      return {
        ok: true,
        message: "Default address updated",
        data: addresses,
      };
    } catch (error) {
      console.error("Error in setDefaultAddress:", error);
      return { ok: false, statusCode: 500, message: "Internal Server Error" };
    }
  },
};

export default profileService;
