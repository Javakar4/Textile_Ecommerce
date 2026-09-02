import axios from 'axios';
import crypto from 'crypto';
import { config, pgConfig } from '../config/config.js';
import dotenv from 'dotenv';
dotenv.config();

async function getAccessToken() {
    const environment = config.NODE_ENV === 'production' ? 'PRODUCTION' : 'SANDBOX';
    const oauthUrl = pgConfig[environment]?.oauthURL;

    const clientId = pgConfig[environment]?.PG_MERCHANT_ID;
    const clientSecret = pgConfig[environment]?.PG_MERCHANT_KEY;
    const clientVersion = pgConfig[environment]?.PG_ID || "1";

    if (!clientId || !clientSecret) {
        throw new Error(`PhonePe configuration missing for ${environment}`);
    }

    const requestBody = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        client_version: clientVersion,
        grant_type: "client_credentials"
    }).toString();

    try {
        const response = await axios.post(oauthUrl, requestBody, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        console.log("✅ PhonePe access token retrieved successfully");
        return response.data.access_token;
    } catch (error) {
        console.error("❌ PhonePe OAuth Error:", error?.response?.data || error.message);
        throw new Error("Failed to fetch PhonePe access token");
    }
}

async function initiatePayment({ amount, merchantOrderId, redirectUrl, phoneNumber }) {
    // Input validation
    if (!amount || typeof amount !== 'number' || amount < 100 || !Number.isFinite(amount)) {
        throw new Error('Invalid amount: must be a positive number >= 100 (in paisa)');
    }
    if (merchantOrderId && (typeof merchantOrderId !== 'string' || merchantOrderId.length > 63 || !/^[a-zA-Z0-9_-]+$/.test(merchantOrderId))) {
        throw new Error('Invalid merchantOrderId: max 63 chars, only alphanumeric, underscore, and hyphen allowed');
    }

    try {
        const environment = config.NODE_ENV === 'production' ? 'PRODUCTION' : 'SANDBOX';
        const merchantId = pgConfig[environment]?.PG_MERCHANT_ID;

        if (!merchantId) {
            throw new Error(`PhonePe configuration missing for ${environment}`);
        }

        // Step 1: Get OAuth access token
        const accessToken = await getAccessToken();

        // Step 2: Build the checkout v2 pay request
        const checkoutUrl = pgConfig[environment]?.checkoutURL;

        const payload = {
            merchantOrderId: merchantOrderId || `TX_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
            amount: amount,
            expireAfter: 1200,
            metaInfo: {
                udf1: merchantId
            },
            paymentFlow: {
                type: "PG_CHECKOUT",
                merchantUrls: {
                    redirectUrl: redirectUrl || `${config.CLIENT_BASE_URL}/payment/callback`
                }
            },
            ...(phoneNumber && { prefillUserLoginDetails: { phone: phoneNumber } })
        };

        const response = await axios({
            method: 'POST',
            url: checkoutUrl,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `O-Bearer ${accessToken}`
            },
            data: payload
        });

        console.log("✅ PhonePe Initiate Payment Success:", response.data?.orderId);
        return response.data;
    } catch (error) {
        console.error("❌ PhonePe Initiate Payment Error:", error?.response?.status || error.message);
        console.error("Error details:", error?.response?.data);
        throw new Error(error?.response?.data?.message || "Failed to initiate payment with PhonePe");
    }
}

export default {
    initiatePayment
}
