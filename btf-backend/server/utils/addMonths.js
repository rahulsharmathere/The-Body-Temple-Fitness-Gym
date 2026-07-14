// Adds a number of months to a date, clamping the day so it stays a valid
// date even when the target month is shorter (e.g. 31 Jan + 1 month -> 28/29 Feb).
const addMonths = (date, months) => {
    const start = new Date(date);

    const year = start.getFullYear();
    const month = start.getMonth();
    const day = start.getDate();

    const futureMonth = month + months;
    const futureYear = year + Math.floor(futureMonth / 12);
    const adjustedMonth = ((futureMonth % 12) + 12) % 12;

    const lastDayOfFutureMonth = new Date(futureYear, adjustedMonth + 1, 0).getDate();
    const adjustedDay = Math.min(day, lastDayOfFutureMonth);

    return new Date(futureYear, adjustedMonth, adjustedDay);
}

module.exports = addMonths;
