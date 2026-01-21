import { rtnRes } from "../utils/responseHandlerService.js";
import { authService } from "../services/authService.js";

const signUserAndSendOTP = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate
    const validation = authService.validateSignupInput({
      name,
      email,
      password,
    });
    if (!validation.ok) return rtnRes(res, 400, validation.message);

    // Check duplicate username
    if (await authService.existingUser(name)) {
      return rtnRes(res, 409, "Username already taken");
    }

    // Check existing email and OTP state
    const emailState =
      await authService.emailExistingAndOtpExistingCheck(email);

    if (emailState?.existingUser) {
      if (emailState.isVerified) {
        return rtnRes(res, 409, "Email already registered. Please login.");
      }

      // existing but not verified → resend OTP
      const resend = await authService.resendOtpForExistingUser(
        emailState.userId,
        email,
        req.ip
      );

      if (!resend.ok) {
        return rtnRes(res, resend.statusCode || 500, resend.message);
      }

      return rtnRes(
        res,
        200,
        "Account found but not verified. OTP resent."
      );
    }

    // Create user
    const passwordHash = await authService.hashPassword(password);
    const storeUserResult = await authService.storeUser(
      email,
      name,
      passwordHash
    );

    if (!storeUserResult.isUserStored)
      return rtnRes(res, 500, "Failed to register user");

    // Send OTP
    const otpResult = await authService.createAndSendOtp(
      storeUserResult.userId,
      email,
      req.ip
    );

    if (!otpResult.ok) return rtnRes(res, 500, "Failed to send OTP");

    return rtnRes(res, 200, "OTP successfully sent to your email");
  } catch (err) {
    console.error("signUserAndSendOTP:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return rtnRes(res, 400, "Email and OTP are required");
    }

    if (!/^[0-9]{6}$/.test(otp))
      return rtnRes(res, 400, "Invalid OTP format");

    const verifyResult = await authService.verifyOtpForEmail(email, otp);

    if (!verifyResult.ok) {
      return rtnRes(
        res,
        verifyResult.statusCode || 400,
        verifyResult.message
      );
    }

    return rtnRes(res, 200, "OTP verified and email marked as verified");
  } catch (err) {
    console.error("verifyOTP:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return rtnRes(res, 400, "Email and password are required");
    }

    const loginResult = await authService.login(email, password);

    if (!loginResult.ok) {
      return rtnRes(
        res,
        loginResult.statusCode || 400,
        loginResult.message
      );
    }

    return rtnRes(res, 200, "Login successful", {
      token: loginResult.token,
    });
  } catch (err) {
    console.error("login:", err);
    return rtnRes(res, 500, "Internal Server Error");
  }
};

export default {
  signUserAndSendOTP,
  verifyOTP,
  login,
};
