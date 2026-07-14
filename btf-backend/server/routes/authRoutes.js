const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
const { auth } = require('../middleware/auth')

router.post('/register', authController.registerAdmin)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/me', auth, authController.getMe)
router.patch('/change-password', auth, authController.changePassword)

router.post('/forgot-password/send-otp', authController.sendOtp)
router.post('/forgot-password/verify-otp', authController.verifyOtp)
router.post('/forgot-password/reset', authController.resetPassword)

module.exports = router;
