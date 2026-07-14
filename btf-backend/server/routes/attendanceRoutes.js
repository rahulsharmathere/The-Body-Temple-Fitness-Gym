const express = require('express')
const router = express.Router();
const attendanceController = require('../controllers/attendanceController')
const { auth, restrictTo } = require('../middleware/auth')

router.use(auth, restrictTo('member'))

router.post('/', attendanceController.markAttendance)
router.get('/me', attendanceController.getMyAttendance)
router.get('/me/stats', attendanceController.getMyStats)

module.exports = router;
