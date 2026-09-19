require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../server/models/User')
const Attendance = require('../server/models/Attendance')

// Usage: node scripts/seedAttendance.js <member-email> [days] [chance]
// Example: node scripts/seedAttendance.js rahul@example.com 300 0.55
//
// - days   : how many past days (including today) to consider. Default 300.
// - chance : probability (0-1) that any given day counts as "attended". Default 0.5.
//
// Safe to re-run: uses upsert, so it will never create duplicate attendance
// rows for a date that's already marked (the schema has a unique index on
// user+date anyway, so duplicates would fail either way).

const [, , emailArg, daysArg, chanceArg] = process.argv

const DAYS = parseInt(daysArg, 10) || 300
const CHANCE = parseFloat(chanceArg) || 0.5

const startOfDay = (d) => {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

const run = async () => {
  if (!emailArg) {
    console.error('Usage: node scripts/seedAttendance.js <member-email> [days] [chance]')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gymBackend')

  const user = await User.findOne({ email: emailArg.toLowerCase(), role: 'member' })
  if (!user) {
    console.error(`No member found with email ${emailArg}`)
    process.exit(1)
  }

  const today = startOfDay(new Date())
  const ops = []

  for (let i = 0; i < DAYS; i++) {
    const date = startOfDay(today)
    date.setDate(date.getDate() - i)

    if (Math.random() < CHANCE) {
      ops.push({
        updateOne: {
          filter: { user: user._id, date },
          update: { $setOnInsert: { user: user._id, date } },
          upsert: true,
        },
      })
    }
  }

  const result = await Attendance.bulkWrite(ops)
  console.log(`Seeded attendance for ${user.email}: ${result.upsertedCount} new day(s) inserted (out of ${ops.length} attempted, ${DAYS} days scanned).`)

  await mongoose.disconnect()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})