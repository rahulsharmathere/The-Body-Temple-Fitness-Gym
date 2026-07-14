// Given an array of attendance dates (any order), returns current streak,
// longest streak, and total days. A streak breaks as soon as a calendar
// day is missing - "today" is allowed to be absent without breaking the
// current streak yet (the member just hasn't checked in today).
const oneDay = 24 * 60 * 60 * 1000;

const toDayKey = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

const calculateStreaks = (dates) => {
    if (!dates.length) {
        return { currentStreak: 0, longestStreak: 0, totalDays: 0 };
    }

    const uniqueDays = [...new Set(dates.map(toDayKey))].sort((a, b) => a - b);

    let longestStreak = 1;
    let running = 1;

    for (let i = 1; i < uniqueDays.length; i++) {
        const gap = (uniqueDays[i] - uniqueDays[i - 1]) / oneDay;
        running = gap === 1 ? running + 1 : 1;
        longestStreak = Math.max(longestStreak, running);
    }

    // walk backwards from today/yesterday to find the current streak
    const today = toDayKey(new Date());
    const yesterday = today - oneDay;
    const lastDay = uniqueDays[uniqueDays.length - 1];

    let currentStreak = 0;
    if (lastDay === today || lastDay === yesterday) {
        currentStreak = 1;
        for (let i = uniqueDays.length - 1; i > 0; i--) {
            const gap = (uniqueDays[i] - uniqueDays[i - 1]) / oneDay;
            if (gap === 1) currentStreak++;
            else break;
        }
    }

    return { currentStreak, longestStreak, totalDays: uniqueDays.length };
}

module.exports = calculateStreaks;
