const WeightHistory = require('../models/WeightHistory')
const MemberProfile = require('../models/MemberProfile')
const calculateBmi = require('../utils/calculateBmi')

// records a new weight entry and keeps MemberProfile.currentWeight in sync,
// without ever overwriting past history
exports.addWeightEntry = async (req, res, next) => {
    try {
        const { weight, date } = req.body;
        if (!weight) {
            return res.status(400).json({ success: false, message: 'Weight is required' });
        }

        const entry = await WeightHistory.create({ user: req.user._id, weight, date });

        const profile = await MemberProfile.findOne({ user: req.user._id });
        if (profile) {
            profile.currentWeight = weight;
            profile.bmi = calculateBmi(profile.height, weight);
            await profile.save();
        }

        res.status(201).json({ success: true, message: 'Weight logged successfully', data: entry });
    } catch (err) {
        next(err);
    }
}

exports.getMyWeightHistory = async (req, res, next) => {
    try {
        const history = await WeightHistory.find({ user: req.user._id }).sort({ date: 1 });
        res.status(200).json({ success: true, message: 'Weight history fetched', data: history });
    } catch (err) {
        next(err);
    }
}
