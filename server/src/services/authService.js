const { queryRunner } = require("../db");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { otp: OTP_CONFIG, jwt: JWT_CONFIG } = require("../config");
const { otpService } = require("./otpService");
const jwt = require("jsonwebtoken");

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$!%*?&]{6,}$/;

module.exports.authService = {
  validateSignupInput({ name, email, password }) {
    if (!name || !email || !password)
      return { ok: false, message: "All details are required" };
    if (!/^[A-Za-z0-9]{2,30}$/.test(name))
      return {
        ok: false,
        message: "Name must be 2-30 alphanumeric characters",
      };
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

  existingUser: async function (username) {
    const sql = `SELECT id FROM users WHERE username = ? LIMIT 1`;
    const rows = await queryRunner(sql, [username]);
    return rows.length > 0;
  },

  emailExistingAndOtpExistingCheck: async function (email) {
    const sql = `SELECT id, is_email_verified 
                FROM users WHERE email = ? LIMIT 1`;
    const rows = await queryRunner(sql, [email]);
    if (rows.length > 0) {
      return {
        existingUser: true,
        userId: rows[0].id,
        isVerified: !!rows[0].is_email_verified,
      };
    }
    // check last otp for this email (if any)
    const sqlOtp = `SELECT otp_hash, expires_at, created_at 
                    FROM email_otps WHERE email = ? 
                    ORDER BY created_at DESC LIMIT 1`;

    const otpRows = await queryRunner(sqlOtp, [email]);
    if (!otpRows || otpRows.length === 0) return {};

    const now = new Date();
    if (new Date(otpRows[0].expires_at) > now) return { otpExpired: false };
    return { otpExpired: true };
  },

  hashPassword: async function (password) {
    return bcrypt.hash(password, 10);
  },

  storeUser: async function (email, username, password_hash) {
    const sql = `INSERT INTO users 
                  (email, 
                  username, 
                  password_hash, 
                  is_email_verified,
                  role, 
                  status, 
                  created_at, 
                  updated_at) VALUES 
                  (?, ?, ?, 0, 'user', 'active', NOW(), NOW())`;
    const result = await queryRunner(sql, [email, username, password_hash]);
    return {
      isUserStored: result.affectedRows > 0,
      userId: result.insertId,
    };
  },

  createAndSendOtp: async function (userId, email, ip) {
    const otpData = otpService.generateOtp();
    const hashed = otpService.hashOtp(otpData.otp);

    const store = await otpService.storeOtp(userId, email, hashed, ip);
    if (!store.ok) {
      return { ok: false, message: "Failed to store OTP" };
    }
    const sent = await otpService.sendOtp(otpData.otp, email);
    if (!sent.ok) {
      return { ok: false, message: "Failed to send OTP" };
    }
    return { ok: true };
  },

  resendOtpForExistingUser: async function (userId, email, ip) {
    // throttle: allow resend only if last OTP expired
    const lastOtp = await otpService.getLastOtp(email);
    const now = new Date();
    if (lastOtp && new Date(lastOtp.expires_at) > now) {
      return {
        ok: false,
        statusCode: 429,
        message: "OTP already sent. Please check inbox.",
      };
    }

    return this.createAndSendOtp(userId, email, ip);
  },

  verifyOtpForEmail: async function (email, otp) {
    const hashed = otpService.hashOtp(otp);
    // ensure verification uses both email and hashed otp
    const row = await otpService.getOtpByEmailAndHash(email, hashed);
    if (!row) return { ok: false, message: "Invalid OTP" };

    if (new Date(row.expires_at) < new Date()) {
      return {
        ok: false,
        message: "OTP expired",
        statusCode: 400,
      };
    }

    // mark email verified
    const sql = `UPDATE users SET 
                  is_email_verified = 1, updated_at = NOW() 
                WHERE email = ?`;
    const result = await queryRunner(sql, [email]);
    if (result.affectedRows === 0) {
      return {
        ok: false,
        message: "Failed to mark email verified",
      };
    }

    return { ok: true };
  },

  login: async function (email, password) {
    const sql = `SELECT id, 
                password_hash, 
                is_email_verified, 
                role, status 
                FROM users WHERE email = ? LIMIT 1`;
                
    const rows = await queryRunner(sql, [email]);
    if (!rows || rows.length === 0)
      return {
        ok: false,
        message: "Invalid email or password",
        statusCode: 401,
      };

    const user = rows[0];
    if (!user.is_email_verified)
      return { ok: false, message: "Email not verified", statusCode: 401 };
    if (user.status !== "active")
      return {
        ok: false,
        message: "User account is not active",
        statusCode: 403,
      };
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return {
        ok: false,
        message: "Invalid email or password",
        statusCode: 401,
      };

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_CONFIG.JWT_SECRET_KEY,
      { expiresIn: JWT_CONFIG.JWT_EXPIRES_IN || "7d" }
    );
    return { ok: true, token };
  },
};
