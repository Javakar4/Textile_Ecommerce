import jwt from "jsonwebtoken";
import { rtnRes } from "../utils/responseHandlerService.js";
import { config } from "../config/config.js";

/**
 * Middleware to authenticate JWT token from Authorization header.
 */
export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log(req.headers);
    console.log(authHeader);

    if (!authHeader) {
      return rtnRes(res, 401, "Unauthorized: Token missing");
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
      return rtnRes(res, 401, "Unauthorized: Invalid token");
    }

    jwt.verify(token, config.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("JWT verification failed:", err.message);
        return rtnRes(res, 403, "Forbidden: Invalid token");
      }

      // Token is valid → add decoded data to req
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.log(" Auth Middleware Error:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return rtnRes(res, 403, "Forbidden: Admin access required");
  }
};

export default authenticateToken;
