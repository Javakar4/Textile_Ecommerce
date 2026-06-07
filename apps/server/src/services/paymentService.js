import axios from 'axios';
import crypto from 'crypto';
import { config, pgConfig } from '../config/config.js';
import dotenv from 'dotenv';
dotenv.config();

async function authorizeToken () {
    try {
        // Determine endpoint based on environment
        const environment = config.NODE_ENV === 'production' ? 'PRODUCTION' : 'SANDBOX';
        const authURL = pgConfig[environment]?.authURL;

        if (!authURL) {
            throw new Error(`PhonePe Auth URL not configured for ${environment}`);
        }

        const requestBodyJson = {
            client_id:pgConfig[environment].PG_MERCHANT_ID,
            client_version:pgConfig[environment].PG_ID,
            client_secret:pgConfig[environment].PG_MERCHANT_KEY,
            grant_type: "client_credentials"
        };
        const requestBody = new URLSearchParams(requestBodyJson).toString();

        const response = await axios({
            method: 'POST',
            url: authURL,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: requestBody
        });

        console.log("PhonePe Auth Success: Token obtained");
        return response.data;
    } catch (error) {
        console.error("PhonePe Auth Error:", error?.response?.status || error.message);
        throw new Error(error?.response?.data?.message || "Failed to authorize with PhonePe");
    }
}

async function initiatePayment({ amount, expireAfter, merchantOrderId, redirectUrl, phoneNumber }) {
    // Input validation
    if (!amount || typeof amount !== 'number' || amount < 100 || !Number.isFinite(amount)) {
        throw new Error('Invalid amount: must be a positive number >= 100 (in paisa)');
    }
    if (merchantOrderId && (typeof merchantOrderId !== 'string' || merchantOrderId.length > 63 || !/^[a-zA-Z0-9_-]+$/.test(merchantOrderId))) {
        throw new Error('Invalid merchantOrderId: max 63 chars, only alphanumeric, underscore, and hyphen allowed');
    }
    if (phoneNumber && !/^\+?\d[\d\s*]{6,14}$/.test(phoneNumber)) {
        throw new Error('Invalid phoneNumber format');
    }

    try {
        const environment = config.NODE_ENV === 'production' ? 'PRODUCTION' : 'SANDBOX';
        const checkoutURL = pgConfig[environment]?.checkoutURL;

        if (!checkoutURL) {
            throw new Error(`PhonePe Checkout URL not configured for ${environment}`);
        }

        // 1. Authorize and get token
        const authResponse = await authorizeToken();
        const token = authResponse?.access_token;

        if (!token) {
            throw new Error("Failed to retrieve access token from PhonePe");
        }

        const requestHeaders = {
            "Content-Type": "application/json",
            "Authorization": `O-Bearer ${token}`
        };

        const requestBody = {
            "merchantOrderId": merchantOrderId || `TX_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
            "amount": amount,
            "expireAfter": expireAfter || 1200,
            "paymentFlow": {
                "type": "PG_CHECKOUT",
                "message": "Payment for order",
                "merchantUrls": {
                    "redirectUrl": redirectUrl || `${config.CLIENT_BASE_URL}/payment/callback`
                }
            }
        };

        // Pre-fill user login details if phone number is provided
        if (phoneNumber) {
            requestBody.prefillUserLoginDetails = {
                phoneNumber: phoneNumber
            };
        }

        const response = await axios({
            method: 'POST',
            url: checkoutURL,
            headers: requestHeaders,
            data: requestBody
        });

        console.log("PhonePe Initiate Payment Success: Order created");
        return response.data;
    } catch (error) {
        console.error("PhonePe Initiate Payment Error:", error?.response?.status || error.message);
        throw new Error(error?.response?.data?.message || "Failed to initiate payment with PhonePe");
    }
}

export default {
    authorizeToken,
    initiatePayment
}



initiatePayment({
    amount: 1000,
    merchantOrderId: `TEST_${Date.now()}`,
    phoneNumber: '9999999999'
})
.then(res => console.log("TEST RESULT:", res))
.catch(err => console.error("TEST ERROR:", err.message));
