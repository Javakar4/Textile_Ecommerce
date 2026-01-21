import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/UserSchema.js";
import EmailOtp from "../models/EmailOtp.js";
import { otpService } from "./otpService.js";
import config from "../config/index.js";

const JWT_CONFIG = config.jwt;


const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$!%*?&]{6,}$/;

export const authService = {
  /* ---------------- VALIDATION ---------------- */
  validateSignupInput({ name, email, password }) {
    if (!name || !email || !password)
      return { ok: false, message: "All details are required" };

    if (!/^[A-Za-z0-9]{2,30}$/.test(name))
      return { ok: false, message: "Name must be 2-30 alphanumeric characters" };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return { ok: false, message: "Invalid email format" };

    if (!PASSWORD_REGEX.test(password))
      return {
        ok: false,
        message:
          "Password must be at least 6 characters, include letters and numbers",
      };

    return { ok: true };
  },

  /* ---------------- USER CHECKS ---------------- */
  async existingUser(username) {
    return await User.exists({ username });
  },

  async emailExistingAndOtpExistingCheck(email) {
    const user = await User.findOne({ email }).lean();

    if (user) {
      return {
        existingUser: true,
        userId: user._id,
        isVerified: user.isEmailVerified,
      };
    }

    const otp = await EmailOtp.findOne({ email })
      .sort({ createdAt: -1 })
      .lean();

    if (!otp) return {};

    return {
      otpExpired: otp.expiresAt < new Date(),
    };
  },

  /* ---------------- PASSWORD ---------------- */
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  },

  /* ---------------- USER CREATE ---------------- */
  async storeUser(email, username, passwordHash) {
    const user = await User.create({
      email,
      username,
      passwordHash,
      isEmailVerified: false,
    });

    return {
      isUserStored: !!user,
      userId: user._id,
    };
  },

  /* ---------------- OTP ---------------- */
  async createAndSendOtp(userId, email, ip) {
    const otpData = otpService.generateOtp();
    const hashed = otpService.hashOtp(otpData.otp);

    await EmailOtp.create({
      userId,
      email,
      otpHash: hashed,
      ip,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
    });

    const sent = await otpService.sendOtp(otpData.otp, email);
    if (!sent.ok) return { ok: false, message: "Failed to send OTP" };

    return { ok: true };
  },

  async resendOtpForExistingUser(userId, email, ip) {
    const lastOtp = await EmailOtp.findOne({ email })
      .sort({ createdAt: -1 });

    if (lastOtp && lastOtp.expiresAt > new Date()) {
      return {
        ok: false,
        statusCode: 429,
        message: "OTP already sent. Please check inbox.",
      };
    }

    return this.createAndSendOtp(userId, email, ip);
  },

  async verifyOtpForEmail(email, otp) {
    const hashed = otpService.hashOtp(otp);

    const record = await EmailOtp.findOne({
      email,
      otpHash: hashed,
    });

    if (!record) return { ok: false, message: "Invalid OTP" };

    if (record.expiresAt < new Date()) {
      return { ok: false, message: "OTP expired", statusCode: 400 };
    }

    await User.updateOne(
      { email },
      { isEmailVerified: true }
    );

    await EmailOtp.deleteMany({ email });

    return { ok: true };
  },

  /* ---------------- LOGIN ---------------- */
  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user)
      return {
        ok: false,
        message: "Invalid email or password",
        statusCode: 401,
      };

    if (!user.isEmailVerified)
      return { ok: false, message: "Email not verified", statusCode: 401 };

    if (user.status !== "active")
      return {
        ok: false,
        message: "User account is not active",
        statusCode: 403,
      };

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
      return {
        ok: false,
        message: "Invalid email or password",
        statusCode: 401,
      };

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_CONFIG.JWT_SECRET_KEY,
      { expiresIn: JWT_CONFIG.JWT_EXPIRES_IN || "7d" }
    );

    return { ok: true, token };
  },
};
