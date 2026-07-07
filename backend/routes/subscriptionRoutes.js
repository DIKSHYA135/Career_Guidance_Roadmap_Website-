const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create-payment', authMiddleware, subscriptionController.createPayment);
router.post('/verify-payment', authMiddleware, subscriptionController.verifyPayment);
router.get('/history', authMiddleware, subscriptionController.getHistory);
router.get('/status', authMiddleware, subscriptionController.getStatus);
router.post('/cancel', authMiddleware, subscriptionController.cancelSubscription);

module.exports = router;
