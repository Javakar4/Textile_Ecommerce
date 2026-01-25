import dotenv from "dotenv";
dotenv.config();

const env =
    process.env.NODE_ENV === "development" ? "127.0.0.1" : "0.0.0.0";

const config = {
    env,

    db: {
        HOST: env,
        USERNAME: process.env.DB_USERNAME || "root",
        PASSWORD: process.env.DB_PASSWORD || "",
        DB_NAME: process.env.DB_NAME || "my_web_app",
    },

    otp: {
        SEND_GRID_KEY: process.env.SEND_GRID_KEY,
        SEND_GRID_FROM_ADDRESS: process.env.SEND_GRID_FROM_ADDRESS,
        OTP_EXPIRATION_MINUTES: process.env.OTP_EXPIRATION_MINUTES || 2,
    },

    jwt: {
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        JWT_EXPIRATION_HOURS: process.env.JWT_EXPIRATION_HOURS || 48,
    },
};

export default config;
