const MemberProfile = require('../models/MemberProfile')
const User = require('../models/User')
const WeightHistory = require('../models/WeightHistory')
const calculateBmi = require('../utils/calculateBmi')
const { validateCompleteProfile } = require('../validators/memberValidators')

exports.getMyProfile = async (req, res, next) => {
    try {
        const profile = await MemberProfile.findOne({ user: req.user._id });
        res.status(200).json({ success: true, message: 'Profile fetched', data: profile });
    } catch (err) {
        next(err);
    }
}

// first-login flow - fills in the fitness details and flips isProfileCompleted
exports.completeProfile = async (req, res, next) => {
    try {
        const errors = validateCompleteProfile(req.body);
        if (errors.length) {
            return res.status(400).json({ success: false, message: errors[0] });
        }

        const { age, gender, height, currentWeight, goal, maintenanceCalories, targetCalories, profilePhoto } = req.body;

        // profilePhoto is now a Cloudinary URL (uploaded from the frontend), not base64
        if (profilePhoto !== undefined && profilePhoto !== '') {
            const isValidUrl = /^https?:\/\//.test(profilePhoto);
            if (!isValidUrl) {
                return res.status(400).json({ success: false, message: 'Invalid image URL' });
            }
        }
        

        const profile = await MemberProfile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        profile.age = age;
        profile.gender = gender;
        profile.height = height;
        profile.currentWeight = currentWeight;
        profile.goal = goal;
        profile.maintenanceCalories = maintenanceCalories;
        profile.targetCalories = targetCalories;
        profile.bmi = calculateBmi(height, currentWeight);
        await profile.save();

        await WeightHistory.create({ user: req.user._id, weight: currentWeight });

        const userUpdates = { isProfileCompleted: true };
        if (profilePhoto) userUpdates.profilePhoto = profilePhoto;
        await User.findByIdAndUpdate(req.user._id, userUpdates);

        res.status(200).json({ success: true, message: 'Profile completed successfully', data: profile });
    } catch (err) {
        next(err);
    }
}

// regular edits after the profile is already completed
exports.updateMyProfile = async (req, res, next) => {
    try {
        const { age, gender, height, currentWeight, goal, maintenanceCalories, targetCalories, name, phone, profilePhoto } = req.body;

        const profile = await MemberProfile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        if (age !== undefined) profile.age = age;
        if (gender !== undefined) profile.gender = gender;
        if (height !== undefined) profile.height = height;
        if (goal !== undefined) profile.goal = goal;
        if (maintenanceCalories !== undefined) profile.maintenanceCalories = maintenanceCalories;
        if (targetCalories !== undefined) profile.targetCalories = targetCalories;

        // weight changes go through WeightHistory so past values are never lost
        if (currentWeight !== undefined && currentWeight !== profile.currentWeight) {
            profile.currentWeight = currentWeight;
            await WeightHistory.create({ user: req.user._id, weight: currentWeight });
        }

        profile.bmi = calculateBmi(profile.height, profile.currentWeight);
        await profile.save();

        if (name !== undefined || phone !== undefined || profilePhoto !== undefined) {
            const userUpdates = {};
            if (name !== undefined) userUpdates.name = name;
            if (phone !== undefined) userUpdates.phone = phone;
            if (profilePhoto !== undefined) userUpdates.profilePhoto = profilePhoto;
            await User.findByIdAndUpdate(req.user._id, userUpdates);
        }

        res.status(200).json({ success: true, message: 'Profile updated successfully', data: profile });
    } catch (err) {
        next(err);
    }
}
