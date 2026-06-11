const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/mark-viewed', authMiddleware, progressController.markViewed);
router.post('/submit-quiz', authMiddleware, progressController.submitQuiz);
router.get('/:roadmapId', authMiddleware, progressController.getProgress);

module.exports = router;
