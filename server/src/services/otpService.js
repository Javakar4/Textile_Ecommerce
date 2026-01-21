import crypto from "crypto";
import sgMail from "@sendgrid/mail";

import EmailOtp from "../models/EmailOtp.js";
import config from "../config/index.js";

const OTP_CONFIG = config.otp;

sgMail.setApiKey(OTP_CONFIG.SEND_GRID_KEY);

export const otpService = {
  generateOtp() {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++)
      otp += digits[Math.floor(Math.random() * digits.length)];
    return { otp };
  },

  hashOtp(otp) {
    return crypto.createHash("sha256").update(otp).digest("hex");
  },

  async storeOtp(userId, email, otpHash, ip) {
    if (!userId || !email || !otpHash) return { ok: false };

    const expiresAt = new Date(
      Date.now() + OTP_CONFIG.OTP_EXPIRATION_MINUTES * 60 * 1000
    );

    // Store OTP
    await EmailOtp.create({
      userId,
      email,
      otpHash,
      ip,
      expiresAt,
    });

    return { ok: true };
  },

  async getLastOtp(email) {
    return await EmailOtp.findOne({ email })
      .sort({ createdAt: -1 })
      .lean();
  },

  async getOtpByEmailAndHash(email, otpHash) {
    return await EmailOtp.findOne({ email, otpHash })
      .sort({ createdAt: -1 })
      .lean();
  },

  async sendOtp(otpCode, email) {
    try {
      const msg = {
        to: email,
        from: OTP_CONFIG.SEND_GRID_FROM_ADDRESS,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otpCode}. It will expire in ${OTP_CONFIG.OTP_EXPIRATION_MINUTES} minutes.`,
        html: `<p>Your OTP code is <strong>${otpCode}</strong>. It will expire in ${OTP_CONFIG.OTP_EXPIRATION_MINUTES} minutes.</p>`,
      };

      await sgMail.send(msg);
      return { ok: true };
    } catch (err) {
      console.error("sendOtp error", err.message || err);
      return { ok: false };
    }
  },
};
