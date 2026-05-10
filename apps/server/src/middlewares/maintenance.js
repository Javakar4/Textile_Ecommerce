import { config } from "../config/config.js";
import { rtnRes } from "../utils/responseHandlerService.js";
import jwt from "jsonwebtoken";

export const maintenanceMode = (req, res, next) => {
  if (config.MAINTENANCE_MODE) {
    // Try to get user from token for admin bypass
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    let user = req.user;
    if (!user && token) {
      try {
        user = jwt.verify(token, config.JWT_SECRET_KEY);
      } catch (err) {
        // Ignore error, just proceed as guest
      }
    }

    if (user?.role === "admin") {
      return next();
    }

    // Whitelist specific routes if needed
    const whitelistedPaths = [
      "/api/v1/auth/login",
      "/api/v1/auth/google",
      "/api/v1/auth/google/callback",
      "/api/v1/auth/verify-otp"
    ];

    if (whitelistedPaths.some(path => req.path.includes(path))) {
      return next();
    }

    return rtnRes(res, 503, "Server is under maintenance. Please try again later.");
  }

  next();
};

export default maintenanceMode;
