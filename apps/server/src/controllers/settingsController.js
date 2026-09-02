import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";
import settingsService from "../services/settingsService.js";
import { rtnRes } from "../utils/responseHandlerService.js";

/**
 * Update authenticated admin password.
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return rtnRes(res, 400, "Current password and new password are required.");
    }

    if (newPassword.length < 6) {
      return rtnRes(res, 400, "New password must be at least 6 characters long.");
    }

    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return rtnRes(res, 404, "User not found.");
    }

    // Verify current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return rtnRes(res, 400, "Incorrect current password.");
    }

    // Hash and update to new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = newPasswordHash;
    await user.save();

    console.log(`🔐 Password successfully updated for admin user ${user.email}`);
    return rtnRes(res, 200, "Password updated successfully.");
  } catch (error) {
    console.error("Change Password Error:", error);
    return rtnRes(res, 500, "An internal server error occurred while changing password.");
  }
};

/**
 * Get current system settings status.
 */
const getSystemSettings = async (req, res) => {
  try {
    const maintenanceMode = settingsService.get("maintenanceMode", false);
    return rtnRes(res, 200, "System settings retrieved successfully", {
      maintenanceMode,
    });
  } catch (error) {
    console.error("Get System Settings Error:", error);
    return rtnRes(res, 500, "An internal server error occurred while retrieving settings.");
  }
};

/**
 * Toggle maintenance mode.
 */
const toggleMaintenanceMode = async (req, res) => {
  try {
    const { enabled } = req.body;
    if (typeof enabled !== "boolean") {
      return rtnRes(res, 400, "Field 'enabled' must be a boolean.");
    }

    await settingsService.set("maintenanceMode", enabled);
    console.log(`🛠️ Maintenance mode set to: ${enabled} by admin ${req.user.email}`);

    return rtnRes(res, 200, `Maintenance mode ${enabled ? "activated" : "deactivated"} successfully.`, {
      maintenanceMode: enabled,
    });
  } catch (error) {
    console.error("Toggle Maintenance Mode Error:", error);
    return rtnRes(res, 500, "An internal server error occurred while updating maintenance mode.");
  }
};

export default {
  changePassword,
  getSystemSettings,
  toggleMaintenanceMode,
};
