const Progress = require('../models/Progress');
const Quiz = require('../models/Quiz');
const User = require('../models/User');

exports.markViewed = async (req, res) => {
    try {
        const { moduleId, roadmapId } = req.body;
        const userId = req.user.userId;

        let progress = await Progress.findOne({ userId, moduleId });
        
        if (!progress) {
            progress = new Progress({
                userId,
                moduleId,
                roadmapId,
                status: 'studied'
            });
        } else {
            if (progress.status === 'locked' || progress.status === 'available') {
                progress.status = 'studied';
            }
        }

        progress.lastAccessedAt = Date.now();
        await progress.save();

        res.json({ success: true, message: 'Module marked as viewed' });
    } catch (err) {
        console.error('Mark Viewed Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.submitQuiz = async (req, res) => {
    try {
        const { moduleId, roadmapId, scorePercentage } = req.body;
        const userId = req.user.userId;

        if (!moduleId || typeof scorePercentage !== 'number') {
            return res.status(400).json({ success: false, message: 'moduleId and scorePercentage are required' });
        }

        const quiz = await Quiz.findOne({ moduleId });
        const passingScore = quiz ? quiz.passingScorePercentage : 70; // default 70%
        const passed = scorePercentage >= passingScore;

        // Update Progress collection
        let progress = await Progress.findOne({ userId, moduleId });
        if (!progress) {
            progress = new Progress({
                userId,
                moduleId,
                roadmapId: roadmapId || moduleId,
                status: passed ? 'completed' : 'studied',
                highestQuizScore: scorePercentage
            });
        } else {
            if (scorePercentage > (progress.highestQuizScore || 0)) {
                progress.highestQuizScore = scorePercentage;
            }
            if (passed && progress.status !== 'completed') {
                progress.status = 'completed';
            }
        }
        progress.lastAccessedAt = Date.now();
        await progress.save();

        // If passed, also update User.completedModules so /api/user/me returns it
        if (passed) {
            await User.findByIdAndUpdate(
                userId,
                { $addToSet: { completedModules: moduleId } },
                { new: true }
            );
        }

        res.json({ success: true, passed, score: scorePercentage, passingScore });
    } catch (err) {
        console.error('Submit Quiz Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getProgress = async (req, res) => {
    try {
        const { roadmapId } = req.params;
        const userId = req.user.userId;

        const progressList = await Progress.find({ userId, roadmapId });
        res.json({ success: true, progress: progressList });
    } catch (err) {
        console.error('Get Progress Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
