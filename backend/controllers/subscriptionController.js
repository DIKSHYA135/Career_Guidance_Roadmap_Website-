const crypto = require('crypto');
const axios = require('axios');
const Transaction = require('../models/Transaction');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

const ESEWA_MERCHANT_CODE = process.env.ESEWA_MERCHANT_CODE || 'EPAYTEST';
const ESEWA_SECRET_KEY = process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://127.0.0.1:5500/Frontend';
const ESEWA_GATEWAY_URL = process.env.ESEWA_GATEWAY_URL || 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
const ESEWA_STATUS_CHECK_URL = process.env.ESEWA_STATUS_CHECK_URL || 'https://rc-epay.esewa.com.np/api/epay/transaction/status/';

function generateSignature(total_amount, transaction_uuid, product_code, secret) {
    const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    return crypto.createHmac('sha256', secret).update(message).digest('base64');
}

exports.createPayment = async (req, res) => {
    try {
        const userId = req.user.userId;
        const amountNPR = 500; // Premium price
        const transaction_uuid = `MOCK-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
        const product_code = 'MOCKTEST'; // Use MOCKTEST to bypass eSewa axios status check

        const signature = generateSignature(amountNPR, transaction_uuid, product_code, ESEWA_SECRET_KEY);

        const newTransaction = await Transaction.create({
            userId,
            amountNPR,
            currency: 'NPR',
            provider: 'mock_esewa',
            transactionRef: transaction_uuid,
            status: 'pending'
        });

        const esewaData = {
            amount: amountNPR,
            tax_amount: 0,
            total_amount: amountNPR,
            transaction_uuid,
            product_code,
            product_service_charge: 0,
            product_delivery_charge: 0,
            success_url: `${FRONTEND_URL}/payment-success.html`,
            failure_url: `${FRONTEND_URL}/payment-failure.html`,
            signed_field_names: 'total_amount,transaction_uuid,product_code',
            signature
        };

        // Pre-compute the valid success callback data for the mock gateway
        const mockCallbackObj = {
            transaction_code: `MOCKTXN-${Date.now()}`,
            status: 'COMPLETE',
            total_amount: amountNPR.toString(),
            transaction_uuid,
            product_code,
            signed_field_names: 'transaction_code,status,total_amount,transaction_uuid,product_code,signed_field_names'
        };
        const messageToSign = `transaction_code=${mockCallbackObj.transaction_code},status=COMPLETE,total_amount=${amountNPR},transaction_uuid=${transaction_uuid},product_code=${product_code},signed_field_names=${mockCallbackObj.signed_field_names}`;
        mockCallbackObj.signature = crypto.createHmac('sha256', ESEWA_SECRET_KEY).update(messageToSign).digest('base64');
        const mockEncodedData = Buffer.from(JSON.stringify(mockCallbackObj)).toString('base64');

        res.json({
            success: true,
            gatewayUrl: `mock-checkout.html`,
            esewaData,
            mockEncodedData // Passed to mock-checkout.html to use upon success
        });
    } catch (err) {
        console.error('Payment Initiate Error:', err);
        res.status(500).json({ success: false, message: 'Server error during payment initiation: ' + err.message });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { encodedData } = req.body;
        if (!encodedData) return res.status(400).json({ success: false, message: 'Missing payment data' });

        const decodedData = JSON.parse(Buffer.from(encodedData, 'base64').toString('utf-8'));
        const { transaction_code, status, total_amount, transaction_uuid, product_code, signed_field_names, signature } = decodedData;

        // Verify signature from callback
        const signedDataArr = signed_field_names.split(',').map(field => `${field}=${decodedData[field] || ''}`);
        const messageToSign = signedDataArr.join(',');
        const expectedSignature = crypto.createHmac('sha256', ESEWA_SECRET_KEY).update(messageToSign).digest('base64');

        if (signature !== expectedSignature) {
            return res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }

        const transaction = await Transaction.findOne({ transactionRef: transaction_uuid });
        if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });

        if (transaction.status === 'success') {
            return res.json({ success: true, message: 'Payment already verified' });
        }

        if (status === 'COMPLETE') {
            // For mock/sandbox transactions, skip the live eSewa API status check
            if (product_code !== 'MOCKTEST') {
                try {
                    const statusCheckUrl = `${ESEWA_STATUS_CHECK_URL}?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`;
                    const statusResponse = await axios.get(statusCheckUrl);
                    if (statusResponse.data.status !== 'COMPLETE') {
                        return res.status(400).json({ success: false, message: 'Transaction verification failed at provider' });
                    }
                } catch (statusCheckError) {
                    console.error('Status Check API Error:', statusCheckError.message);
                    return res.status(500).json({ success: false, message: 'Failed to verify transaction with provider' });
                }
            }

            // Mark transaction success
            transaction.status = 'success';
            transaction.providerTransactionCode = transaction_code;
            transaction.providerResponse = decodedData;
            
            // Create Subscription
            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 30); // 30 days premium

            const subscription = await Subscription.create({
                userId: transaction.userId,
                planType: 'Xyverra Pro Monthly',
                status: 'active',
                startDate,
                endDate,
                transactionRef: transaction_uuid,
                amountPaid: transaction.amountNPR
            });

            transaction.subscriptionId = subscription._id;
            await transaction.save();

            // Update user profile
            await User.findByIdAndUpdate(transaction.userId, {
                activeSubscription: subscription._id,
                chatSubscriptionActive: true,
                chatSubscriptionExpiry: endDate
            });

            return res.json({ 
                success: true, 
                message: 'Payment verified successfully',
                subscription: {
                    status: 'active',
                    endDate: endDate,
                    planType: 'Xyverra Pro Monthly',
                    amountPaid: transaction.amountNPR
                }
            });
        } else {
            transaction.status = 'failed';
            transaction.providerResponse = decodedData;
            await transaction.save();
            return res.status(400).json({ success: false, message: 'Payment not completed' });
        }

    } catch (err) {
        console.error('Payment Verify Error:', err);
        res.status(500).json({ success: false, message: 'Server error during verification' });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.userId }).sort({ createdAt: -1 }).limit(50);
        res.json({ success: true, transactions });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error fetching transactions' });
    }
};

exports.getStatus = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({ 
            userId: req.user.userId,
            status: 'active',
            endDate: { $gt: new Date() }
        }).sort({ endDate: -1 });

        if (subscription) {
            res.json({ isActive: true, subscription });
        } else {
            res.json({ isActive: false });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error fetching status' });
    }
};

exports.cancelSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({
            userId: req.user.userId,
            status: 'active'
        });

        if (!subscription) {
            return res.status(404).json({ success: false, message: 'No active subscription found to cancel' });
        }

        subscription.status = 'cancelled';
        await subscription.save();

        // Clear ALL subscription flags on the user.
        // This is critical: clearing chatSubscriptionExpiry prevents the legacy
        // isSubscriptionActive check from still granting access for the remainder
        // of the original billing period after a manual cancellation.
        await User.findByIdAndUpdate(req.user.userId, {
            chatSubscriptionActive: false,
            activeSubscription: null,
            chatSubscriptionExpiry: null
        });

        res.json({ success: true, message: 'Subscription successfully cancelled' });
    } catch (err) {
        console.error('Cancel Subscription Error:', err);
        res.status(500).json({ success: false, message: 'Server error while cancelling subscription' });
    }
};
