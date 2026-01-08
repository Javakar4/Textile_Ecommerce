// services/otpService.js

const { queryRunner } = require("../db");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const { otp: OTP_CONFIG } = require("../config");
sgMail.setApiKey(OTP_CONFIG.SEND_GRID_KEY);

module.exports.otpService = {
  generateOtp() {
    // const otp = crypto.randomInt(100000, 999999).toString().padStart(6, '0');
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
    // expires_at: e.g., 5 minutes from now
    const expiresAt = new Date(
      Date.now() + OTP_CONFIG.OTP_EXPIRATION_MINUTES * 60 * 1000
    );

    // Ensure your table has UNIQUE KEY on (email) or (user_id)
    const sql = `INSERT INTO email_otps (
                  user_id, 
                  email, 
                  otp_hash, 
                  created_at, 
                  expires_at, 
                  ip_address)
                  VALUES (?, ?, ?, NOW(), ?, ?)
                    ON DUPLICATE KEY UPDATE                     
                      otp_hash = VALUES(otp_hash), 
                      created_at = NOW(), 
                      expires_at = VALUES(expires_at), 
                      ip_address = VALUES(ip_address)`;

    const result = await queryRunner(sql, [
      userId,
      email,
      otpHash,
      expiresAt,
      ip,
    ]);
    return { ok: result.affectedRows > 0 };
  },

  async getLastOtp(email) {
    const sql = `SELECT * FROM 
                  email_otps WHERE email = ? 
                ORDER BY created_at DESC LIMIT 1`;
    const rows = await queryRunner(sql, [email]);
    return rows && rows.length ? rows[0] : null;
  },

  async getOtpByEmailAndHash(email, otpHash) {
    const sql = `SELECT * FROM 
                  email_otps WHERE email = ? 
                  AND otp_hash = ? 
                ORDER BY created_at DESC LIMIT 1`;
    const rows = await queryRunner(sql, [email, otpHash]);
    return rows && rows.length ? rows[0] : null;
  },

  async sendOtp(otpCode, email) {
    try {
      const msg = {
        to: email,
        from: OTP_CONFIG.SEND_GRID_FROM_ADDRESS,
        subject: "Your OTP Code",
        text   : `Your OTP code is ${otpCode}. 
                  It will expire in ${OTP_CONFIG.OTP_EXPIRATION_MINUTES} 
                  minutes.`,
        html   : `<p>Your OTP code is <strong>${otpCode}</strong>. 
                  It will expire in ${OTP_CONFIG.OTP_EXPIRATION_MINUTES} 
                  minutes.</p>`,
      };
      await sgMail.send(msg);
      return { ok: true };
    } catch (err) {
      console.error("sendOtp error", err.message || err);
      return { ok: false };
    }
  },
};
