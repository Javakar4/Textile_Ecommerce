import axios from 'axios';
import crypto from 'crypto';
import { config, pgConfig } from '../config/config.js';
import dotenv from 'dotenv';
dotenv.config();

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
        const checkoutURL = pgConfig[environment]?.checkoutURL;
        const payEndpoint = pgConfig[environment]?.payEndpoint || "/pg/v1/pay";
        const merchantId = pgConfig[environment]?.PG_MERCHANT_ID;
        const saltKey = pgConfig[environment]?.PG_MERCHANT_KEY;
        const saltIndex = pgConfig[environment]?.PG_ID || "1";

        if (!checkoutURL || !merchantId || !saltKey) {
            throw new Error(`PhonePe configuration missing for ${environment}`);
        }

        const payload = {
            merchantId: merchantId,
            merchantTransactionId: merchantOrderId || `TX_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
            merchantUserId: `MUID_${crypto.randomBytes(6).toString('hex')}`,
            amount: amount,
            redirectUrl: redirectUrl || `${config.CLIENT_BASE_URL}/payment/callback`,
            redirectMode: "REDIRECT",
            callbackUrl: `${config.BACKEND_URL}/api/orders/payment/webhook`,
            mobileNumber: phoneNumber || "9999999999",
            paymentInstrument: {
                type: "PAY_PAGE"
            }
        };

        const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
        const stringToHash = base64Payload + payEndpoint + saltKey;
        const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
        const checksum = sha256 + "###" + saltIndex;

        const requestHeaders = {
            "Content-Type": "application/json",
            "X-VERIFY": checksum
        };

        const response = await axios({
            method: 'POST',
            url: checkoutURL,
            headers: requestHeaders,
            data: { request: base64Payload }
        });

        console.log("PhonePe Initiate Payment Success: Order created");
        return response.data;
    } catch (error) {
        console.error("PhonePe Initiate Payment Error:", error?.response?.status || error.message);
        throw new Error(error?.response?.data?.message || "Failed to initiate payment with PhonePe");
    }
}

export default {
    initiatePayment
}
