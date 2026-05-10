import sendgrid from "@sendgrid/mail";
import crypto from "crypto";
import { config } from "../config/config.js";

sendgrid.setApiKey(config.SEND_GRID_KEY);

export const otpService = {
  /**
   * Generates a 6-digit numeric OTP.
   */
  generateOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return { otp };
  },

  /**
   * Hashes the OTP for secure storage.
   */
  hashOtp(otp) {
    return crypto.createHash("sha256").update(otp).digest("hex");
  },

  /**
   * Sends the OTP via email using SendGrid.
   */
  async sendOtp(otp, email) {
    try {
      const msg = {
        to: email,
        from: config.SEND_GRID_FROM_ADDRESS,
        subject: "Your OTP for Textile Ecommerce Verification",
        text: `Your OTP is: ${otp}. It will expire in ${config.OTP_EXPIRATION_MINUTES || 5} minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #b45309; text-align: center;">Textile Ecommerce</h2>
            <p>Hello,</p>
            <p>Your verification code for signup is:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1f2937; background: #fef3c7; padding: 10px 20px; border-radius: 5px;">${otp}</span>
            </div>
            <p>This OTP will expire in <strong>${config.OTP_EXPIRATION_MINUTES || 5} minutes</strong>.</p>
            <p>If you did not request this code, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #6b7280; text-align: center;">© 2024 Textile Ecommerce. All rights reserved.</p>
          </div>
        `,
      };

      await sendgrid.send(msg);
      console.log(`OTP sent successfully to ${email}`);
      return { ok: true };
    } catch (error) {
      console.error(
        "Error sending OTP via SendGrid:",
        error.response ? error.response.body : error.message,
      );
      return { ok: false, message: "Failed to send OTP email" };
    }
  },
};
