var {queryRunner}=require("../db")
const {rtnRes} = require("../utils/responseHandlerService")
// Verify OTP middleware (Express)
async function verifyOtpMiddleware(req, res, next) {
    try {
        // console.log(req.body)
        const { email, otp,password, name  } = req.body.formData;

        if (!email || !otp || !name || !password)  {
           return rtnRes(res, 400, "ALL fields are required");
        }

        // Fetch OTP record
        const rows = await queryRunner(
            `SELECT otp, expires_at 
             FROM email_otp
             WHERE email = ? 
             ORDER BY created_at DESC 
             LIMIT 1`,
            [email]
        );

        if (rows.length === 0) {
            return rtnRes(res, 404, "OTP not found please request again");
        }

        const dbOtp = rows[0];
        const now = new Date();

        if (new Date(dbOtp.expires_at) < now) {
            return rtnRes(res, 400,"OTP expired. Please request a new one.");
        }

        // Compare hashed OTP
        const hashedInputOtp = crypto.createHash('sha256').update(otp).digest('hex');
        if (dbOtp.otp !== hashedInputOtp) {
            return rtnRes(res,400,"Invalid OTP");
        }
        const rows1 = await queryRunner(
            `UPDATE email_otp
            SET is_verified = 1 
            WHERE email = ? `,
            [phoneNumber]
        )

        // OTP verified successfully
        req.isOtpVerified = true; 
        next();

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return rtnRes(res, 500, error.message)
    }
}


module.exports={ verifyOtpMiddleware }