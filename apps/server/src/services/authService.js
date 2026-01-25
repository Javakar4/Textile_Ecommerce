import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import EmailOtp from "../models/EmailOtp.js";
import Address from "../models/AddressSchema.js";
import { otpService } from "./otpService.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY || "fallback_secret";
const JWT_EXPIRES = process.env.JWT_EXPIRATION_HOURS
  ? `${process.env.JWT_EXPIRATION_HOURS}h`
  : "48h";
const OTP_EXP_MINS = parseInt(process.env.OTP_EXPIRATION_MINUTES) || 5;

export const authService = {
  async signup(name, email, password, ip) {
    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username: name });

    if (existingUser) {
      if (existingUser.isEmailVerified) {
        return {
          ok: false,
          statusCode: 400,
          message: "Email already registered and verified.",
        };
      }

      // User exists but not verified - keep existing user and send new OTP
      return this.initiateVerification(existingUser, ip);
    }

    if (existingUsername) {
      return {
        ok: false,
        statusCode: 400,
        message: "Username already taken",
      };
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      // fullName: email.split("@")[0] + "_" + Math.floor(Math.random() * 1000), // temp username
      username: name,
      passwordHash,
      isEmailVerified: false,
    });

    return this.initiateVerification(user, ip);
  },

  async initiateVerification(user, ip) {
    const { otp } = otpService.generateOtp();
    const otpHash = otpService.hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_EXP_MINS * 60 * 1000);

    // Remove any existing OTP for this user
    await EmailOtp.deleteMany({ userId: user._id });

    // Store new OTP
    await EmailOtp.create({
      userId: user._id,
      email: user.email,
      otpHash,
      ip,
      expiresAt,
    });

    // Send via SendGrid
    const sendResult = await otpService.sendOtp(otp, user.email);
    if (!sendResult.ok) {
      return {
        ok: false,
        statusCode: 500,
        message: "User registered but failed to send OTP email.",
      };
    }

    return { ok: true, message: "OTP sent to your email." };
  },

  async verifyOtp(email, otp) {
    const user = await User.findOne({ email });
    if (!user)
      return { ok: false, statusCode: 404, message: "User not found." };

    if (user.isEmailVerified)
      return { ok: false, statusCode: 400, message: "Email already verified." };

    const otpRecord = await EmailOtp.findOne({ userId: user._id });
    if (!otpRecord)
      return {
        ok: false,
        statusCode: 400,
        message: "OTP expired or not found. Please resend.",
      };

    const hashedInput = otpService.hashOtp(otp);
    if (otpRecord.otpHash !== hashedInput) {
      return { ok: false, statusCode: 400, message: "Invalid OTP code." };
    }

    // Mark as verified
    user.isEmailVerified = true;
    await user.save();

    // Cleanup OTP
    await EmailOtp.deleteOne({ _id: otpRecord._id });

    return { ok: true, message: "Email verified successfully." };
  },

  async resendOtp(email, ip) {
    const user = await User.findOne({ email });
    if (!user)
      return { ok: false, statusCode: 404, message: "User not found." };
    if (user.isEmailVerified)
      return { ok: false, statusCode: 400, message: "Email already verified." };

    // Rate limiting: Check if the last OTP was sent less than 10 seconds ago
    const lastOtp = await EmailOtp.findOne({ userId: user._id }).sort({
      updatedAt: -1,
    });
    if (lastOtp) {
      const timeSinceLastOtp =
        (Date.now() - new Date(lastOtp.updatedAt).getTime()) / 1000;
      if (timeSinceLastOtp < 10) {
        const waitTime = Math.ceil(10 - timeSinceLastOtp);
        return {
          ok: false,
          statusCode: 429,
          message: `Please wait ${waitTime} seconds before requesting a new OTP.`,
        };
      }
    }

    return this.initiateVerification(user, ip);
  },

  async forgotPassword(email, ip) {
    const user = await User.findOne({ email });
    if (!user) {
      return { ok: false, statusCode: 404, message: "User not found." };
    }

    const result = await this.initiateVerification(user, ip);
    if (!result.ok) return result;

    return { ok: true, message: "OTP sent to your email for password reset." };
  },

  async resetPassword(email, otp, newPassword) {
    const user = await User.findOne({ email });
    if (!user)
      return { ok: false, statusCode: 404, message: "User not found." };

    const otpRecord = await EmailOtp.findOne({ userId: user._id });
    if (!otpRecord)
      return {
        ok: false,
        statusCode: 400,
        message: "OTP expired or not found. Please resend.",
      };

    const hashedInput = otpService.hashOtp(otp);
    if (otpRecord.otpHash !== hashedInput) {
      return { ok: false, statusCode: 400, message: "Invalid OTP code." };
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = passwordHash;
    await user.save();

    await EmailOtp.deleteOne({ _id: otpRecord._id });

    return { ok: true, message: "Password reset successfully. Please login." };
  },

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user)
      return {
        ok: false,
        statusCode: 401,
        message: "Invalid email or password.",
      };

    if (!user.isEmailVerified) {
      return {
        ok: false,
        statusCode: 403,
        message: "Email not verified. Please verify your email first.",
        unverified: true,
      };
    }

    if (user.status !== "active") {
      return {
        ok: false,
        statusCode: 403,
        message: "Account is inactive. Please contact support.",
      };
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return {
        ok: false,
        statusCode: 401,
        message: "Invalid email or password.",
      };
      
    const addresses = await Address.find({ userId: user._id });
    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES },
    );

    return {
      ok: true,
      message: "Login successful.",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          avatar: user.avatar,
        },
        userAddress: addresses,
      },
    };
  },
};
