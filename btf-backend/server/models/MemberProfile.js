const mongoose = require("mongoose");

const memberProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    height: {
        // cm
        type: Number,
    },
    currentWeight: {
        // kg
        type: Number,
    },
    goal: {
        type: String,
    },
    bmi: {
        type: Number,
    },
    maintenanceCalories: {
        type: Number,
    },
    targetCalories: {
        type: Number,
    },
    joinedDate: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })

const MemberProfile = mongoose.model("MemberProfile", memberProfileSchema);

module.exports = MemberProfile;
