const express = require('express');
const router = express.Router();
const proAuthMiddleware = require('../middleware/proAuthMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { recomputeAndSaveReadiness, getReadinessLabel } = require('../utils/readiness');

router.use(authMiddleware);
router.use(proAuthMiddleware);

router.get('/dashboard', async (req, res) => {
    try {
        const user = req.userDoc;
        const jobRole = user.selectedPath || 'Software Engineer';

        // Canonical Job Readiness Score — same formula/value as Dashboard, Progress, and Admin Panel.
        const readinessScore = await recomputeAndSaveReadiness(user._id);
        const readinessInfo = getReadinessLabel(readinessScore);

        // Mock analytics data. In a real application, this would be computed or fetched from a ML service/DB.
        const mockAnalytics = {
            salaryTrends: [
                { year: 2023, average: 85000 },
                { year: 2024, average: 92000 },
                { year: 2025, average: 98000 },
                { year: 2026, average: 105000 }
            ],
            jobDemand: "High (15% YoY Growth)",
            topSkillsInDemand: ["React", "Node.js", "Python", "Cloud Architecture", "System Design"],
            userProgress: {
                completedModules: user.completedModules ? user.completedModules.length : 0,
                competencyScore: user.competencyScore || 0,
                projectedSalaryRange: { min: 70000, max: 110000 },
                readinessScore,
                readinessLabel: readinessInfo.label,
                readinessColor: readinessInfo.color
            }
        };

        // Cache the analytics data on the user model for history tracking
        user.analyticsData = mockAnalytics;
        await user.save();

        res.json({ success: true, data: mockAnalytics });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch analytics data' });
    }
});

module.exports = router;
