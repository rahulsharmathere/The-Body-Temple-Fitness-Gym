const mongoose = require("mongoose");

const weightHistorySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })

const WeightHistory = mongoose.model("WeightHistory", weightHistorySchema);

module.exports = WeightHistory;
