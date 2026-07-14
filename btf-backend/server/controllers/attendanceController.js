const Attendance = require('../models/Attendance')
const calculateStreaks = require('../utils/calculateStreaks')

const startOfToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

exports.markAttendance = async (req, res, next) => {
    try {
        const today = startOfToday();

        const alreadyMarked = await Attendance.findOne({ user: req.user._id, date: today });
        if (alreadyMarked) {
            return res.status(409).json({ success: false, message: 'Attendance already marked for today' });
        }

        const attendance = await Attendance.create({ user: req.user._id, date: today });

        res.status(201).json({ success: true, message: 'Attendance marked successfully', data: attendance });
    } catch (err) {
        next(err);
    }
}

exports.getMyAttendance = async (req, res, next) => {
    try {
        const attendance = await Attendance.find({ user: req.user._id }).sort({ date: -1 });
        res.status(200).json({ success: true, message: 'Attendance fetched', data: attendance });
    } catch (err) {
        next(err);
    }
}

// current streak, longest streak, total days, and a month-by-month count -
// enough for a LeetCode/GitHub style contribution view on the frontend
// without shipping every single date to the client for that purpose.
exports.getMyStats = async (req, res, next) => {
    try {
        const attendance = await Attendance.find({ user: req.user._id }).sort({ date: 1 });
        const dates = attendance.map(a => a.date);

        const { currentStreak, longestStreak, totalDays } = calculateStreaks(dates);

        const monthly = {};
        dates.forEach(date => {
            const key = new Date(date).toISOString().slice(0, 7); // YYYY-MM
            monthly[key] = (monthly[key] || 0) + 1;
        });

        res.status(200).json({
            success: true,
            message: 'Attendance stats fetched',
            data: { currentStreak, longestStreak, totalDays, monthly }
        });
    } catch (err) {
        next(err);
    }
}
