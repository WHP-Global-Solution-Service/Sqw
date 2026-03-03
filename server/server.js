// ======================================================
// ChillPay Backend Server - TEMPORARILY DISABLED
// ======================================================
// ยังไม่ได้เปิดใช้งาน server ในขั้นตอนนี้
// แอปพลิเคชันสามารถทำงานได้โดยไม่ต้องรัน server ก่อน
// ======================================================

/*
// ChillPay Backend Server for Sandbox
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Mock mode for testing when ChillPay is unavailable
const MOCK_MODE = process.env.MOCK_MODE === 'true' || true; // Set to true for testing

// ChillPay Configuration
const CHILLPAY_CONFIG = {
    merchantCode: 'M037016',
    apiKey: 'Oh7XNjDQowUfM7G020YIU1gt7jNXxIdUaCm8UL8XFXvEzElamuzurR1HGuuxLP8',
    md5Key: 'QafTNUc1ZOHtftrWn1stlFE5JSag7soPziUywFYHumBl2UERl9Op8gzrLnyQfHZgpN8rqjTwLozOv5ppSTh6njC0hEcs6AbICYyT8MqgO1WwNbw5kXd6w1uaAS0KauTYsQeYHqj6SfOyRLj3R8McK9saHGlCAiO23gkawF',
    sandboxUrl: 'https://sandbox-pgw.chillpay.co/api/v3'
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));

// Generate MD5 Hash
function generateMD5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

// API Endpoints

// Create Payment
app.post('/api/payment/create', async (req, res) => {
    try {
        const { orderId, amount, customerName, landId } = req.body;

        if (!orderId || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: orderId, amount'
            });
        }

        // Generate MD5 signature
        const md5String = `${CHILLPAY_CONFIG.merchantCode}${orderId}${parseFloat(amount).toFixed(2)}`;
        const md5Hash = generateMD5(md5String);

        // Prepare payload
        const payload = {
            MerchantCode: CHILLPAY_CONFIG.merchantCode,
            OrderNo: orderId,
            Amount: parseFloat(amount).toFixed(2),
            CurrencyCode: 'THB',
            RouteNo: '1',
            PaymentType: '',
            Lang: 'th',
            IpAddress: req.ip || '127.0.0.1',
            MD5Hash: md5Hash,
            CustomRoute: '',
            ResponseUrl: `${req.protocol}://${req.get('host')}/payment-response`,
            BackendUrl: `${req.protocol}://${req.get('host')}/api/payment/callback`,
            CustomerName: customerName || 'Guest',
            CustomerEmail: '',
            CustomerTelephone: '',
            Custom1: landId || '',
            Custom2: '',
            Custom3: ''
        };

        console.log('🔵 Creating payment:', {
            orderId,
            amount,
            landId,
            md5String
        });

        // Mock mode for testing
        if (MOCK_MODE) {
            console.log('🎯 Mock Mode: Simulating ChillPay response');

            const mockResponse = {
                Code: '0000',
                Message: 'Success (Mock)',
                PaymentUrl: `http://localhost:8080/mock-payment.html?orderId=${orderId}&amount=${amount}&landId=${landId}`,
                OrderNo: orderId,
                Amount: parseFloat(amount).toFixed(2)
            };

            return res.json({
                success: true,
                data: mockResponse,
                mock: true
            });
        }

        // Call ChillPay API (real mode)
        const response = await axios.post(
            `${CHILLPAY_CONFIG.sandboxUrl}/Payment/Charge`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CHILLPAY_CONFIG.apiKey}`
                }
            }
        );

        console.log('✅ ChillPay Response:', response.data);

        res.json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error('❌ Payment creation error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: error.response?.data?.Message || error.message,
            error: error.response?.data || error.message
        });
    }
});

// Payment Callback (from ChillPay)
app.post('/api/payment/callback', async (req, res) => {
    try {
        console.log('💰 Payment Callback:', req.body);

        const { OrderNo, Status, Code, Message } = req.body;

        // Verify signature if needed
        // ... add signature verification here

        // Update your database with payment status
        // ... save to Firebase or your database

        res.status(200).json({
            success: true,
            message: 'Callback received'
        });

    } catch (error) {
        console.error('❌ Callback error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Check Payment Status
app.get('/api/payment/status/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        if (MOCK_MODE) {
            console.log('🎯 Mock Mode: Payment status check for', orderId);

            const mockStatus = {
                Code: '0000',
                Message: 'Success (Mock)',
                OrderNo: orderId,
                PaymentStatus: 'SUCCESS',
                Amount: '120000000.00',
                TransactionDate: new Date().toISOString()
            };

            return res.json({
                success: true,
                data: mockStatus,
                mock: true
            });
        }

        // Generate MD5 for status check
        const md5String = `${CHILLPAY_CONFIG.merchantCode}${orderId}`;
        const md5Hash = generateMD5(md5String);

        const response = await axios.post(
            `${CHILLPAY_CONFIG.sandboxUrl}/Payment/Query`,
            {
                MerchantCode: CHILLPAY_CONFIG.merchantCode,
                OrderNo: orderId,
                MD5Hash: md5Hash
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CHILLPAY_CONFIG.apiKey}`
                }
            }
        );

        res.json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error('❌ Status check error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: error.response?.data?.Message || error.message
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'ChillPay Backend Server is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║   ChillPay Backend Server (Sandbox)       ║
╠════════════════════════════════════════════╣
║   Port: ${PORT}                              ║
║   Merchant: ${CHILLPAY_CONFIG.merchantCode}              ║
║   Status: ✅ Running                       ║
╚════════════════════════════════════════════╝
  `);
});

module.exports = app;
*/

// ======================================================
// PLACEHOLDER - Server is disabled
// Uncomment the code above when ready to enable server
// ======================================================



module.exports = {};
