import dotenv from 'dotenv'
dotenv.config()


export const config = {
    PORT: process.env.PORT || 4000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI,
    
    SEND_GRID_FROM_ADDRESS: process.env.SEND_GRID_FROM_ADDRESS || "",
    SEND_GRID_KEY: process.env.SEND_GRID_KEY || "",
    
    OTP_EXPIRATION_MINUTES: process.env.OTP_EXPIRATION_MINUTES,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRATION_HOURS: process.env.JWT_EXPIRATION_HOURS,
    
    CLIENT_BASE_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    BACKEND_URL: process.env.SERVER_BASE_URL || process.env.BACKEND_URL || 'http://localhost:4000',
    
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    
    MAINTENANCE_MODE: process.env.MAINTENANCE_MODE === 'true',

     
}


export const pgConfig = {
   SANDBOX:{
     payEndpoint: "/checkout/v2/pay",
     checkoutURL: "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay",
     oauthURL: "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token",
     PG_MERCHANT_ID: process.env.PG_MERCHANT_ID,
     PG_MERCHANT_KEY: process.env.PG_MERCHANT_KEY,  
     PG_ID: process.env.PG_ID || "1"
   },

   PRODUCTION:{
     payEndpoint: "/checkout/v2/pay",
     checkoutURL: "https://api.phonepe.com/apis/pg/checkout/v2/pay",
     oauthURL: "https://api.phonepe.com/apis/pg/v1/oauth/token",
     PG_MERCHANT_ID: process.env.PG_MERCHANT_ID,
     PG_MERCHANT_KEY: process.env.PG_MERCHANT_KEY,  
     PG_ID: process.env.PG_ID || "1"
   }
}

// Validate required PhonePe credentials at startup
if (!process.env.PG_MERCHANT_ID || !process.env.PG_MERCHANT_KEY) {
  console.warn('⚠️  Missing PhonePe credentials: PG_MERCHANT_ID and/or PG_MERCHANT_KEY are not set. Payment features will not work.');
}