const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        // stored as the day's date at midnight so (user,date) stays unique per day
        type: Date,
        required: true,
    },
}, { timestamps: true })

// a member can only mark attendance once per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
