const jwt = require("jsonwebtoken");
const  {jwt:JWT} = require("../config/index.js");
const  {rtnRes} = require("../utils/responseHandlerService.js");


function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      console.log(" No Authorization header");
      return rtnRes(res, 401, "Unauthorized: Token missing");
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
      console.log(" Bearer token missing in Authorization header");
      return rtnRes(res, 401, "Unauthorized: Invalid token");
    }

    jwt.verify(token,JWT.JWT_SECRET_KEY, (err, decoded) => {
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
}

module.exports = authenticateToken;