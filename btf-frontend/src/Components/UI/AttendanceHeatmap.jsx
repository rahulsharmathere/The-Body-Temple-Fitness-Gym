import React, { useMemo } from 'react'

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const toKey = (date) => date.toISOString().slice(0, 10)

// Builds a grid locked to a single calendar year (Jan 1 -> Dec 31), padded
// out to full weeks at both ends so the columns line up, GitHub's per-year
// view style. Pure function of (year, history, today) - nothing here reads
// a rolling "now" window, so it never silently drifts across year
// boundaries. When `year` is left as the current year, the grid simply
// starts empty again on its own come next Jan 1 - no yearly code change.
const buildWeeksForYear = (year, attendedDates, today) => {
  const yearStart = new Date(year, 0, 1)
  const yearEnd = new Date(year, 11, 31)

  const gridStart = new Date(yearStart)
  gridStart.setDate(yearStart.getDate() - yearStart.getDay())

  const gridEnd = new Date(yearEnd)
  gridEnd.setDate(yearEnd.getDate() + (6 - yearEnd.getDay()))

  const weeks = []
  const cursor = new Date(gridStart)

  while (cursor <= gridEnd) {
    const days = []
    for (let d = 0; d < 7; d++) {
      const key = toKey(cursor)
      const inYear = cursor.getFullYear() === year
      days.push({
        key,
        date: new Date(cursor),
        attended: inYear && attendedDates.has(key),
        isPadding: !inYear,
        isFuture: cursor > today,
      })
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(days)
  }

  return weeks
}

// One label per week-column, placed on the first week where a new month
// starts - same approach GitHub's graph uses.
const buildMonthLabels = (weeks) => {
  const labels = []
  let lastMonth = null
  weeks.forEach((week, i) => {
    const firstRealDay = week.find((d) => !d.isPadding) || week[0]
    const month = firstRealDay.date.getMonth()
    if (month !== lastMonth) {
      labels.push({ index: i, label: MONTH_LABELS[month] })
      lastMonth = month
    }
  })
  return labels
}

const AttendanceHeatmap = ({ history, year }) => {
  const targetYear = year || new Date().getFullYear()

  const attendedDates = useMemo(() => {
    const set = new Set()
    history.forEach((item) => set.add(toKey(new Date(item.date))))
    return set
  }, [history])

  const weeks = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return buildWeeksForYear(targetYear, attendedDates, today)
  }, [targetYear, attendedDates])

  const monthLabels = useMemo(() => buildMonthLabels(weeks), [weeks])

  return (
    <div className='overflow-x-auto'>
      <div className='inline-flex flex-col gap-2 min-w-max'>
        <div className='grid grid-flow-col gap-[3px]' style={{ gridTemplateRows: 'repeat(7, 11px)' }}>
          {weeks.map((week, wi) => (
            <React.Fragment key={wi}>
              {week.map((day) => (
                <div
                  key={day.key}
                  title={day.isPadding ? undefined : `${day.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}${day.attended ? ' - present' : ''}`}
                  className={`w-[11px] h-[11px] rounded-[2px] ${
                    day.isPadding
                      ? 'bg-transparent'
                      : day.attended
                        ? 'bg-crimson-500'
                        : 'bg-ink-700 border border-ink-600'
                  }`}
                />
              ))}
            </React.Fragment>
          ))}
        </div>

        <div className='relative h-4 text-[11px] text-bone-500'>
          {monthLabels.map(({ index, label }) => (
            <span key={index} className='absolute' style={{ left: `${index * 14}px` }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AttendanceHeatmap