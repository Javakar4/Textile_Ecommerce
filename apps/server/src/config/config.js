import dotenv from 'dotenv'
dotenv.config({
    path: '../../.env'
})


export const config = {
    PORT: process.env.PORT || 4000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI,
    
    SEND_GRID_FROM_ADDRESS: process.env.SEND_GRID_FROM_ADDRESS || "",
    SEND_GRID_KEY: process.env.SEND_GRID_KEY || "",
    
    OTP_EXPIRATION_MINUTES: process.env.OTP_EXPIRATION_MINUTES,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRATION_HOURS: process.env.JWT_EXPIRATION_HOURS,
    
    CLIENT_BASE_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}


