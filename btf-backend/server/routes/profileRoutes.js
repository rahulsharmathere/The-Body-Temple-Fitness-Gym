const express = require('express')
const router = express.Router();
const profileController = require('../controllers/profileController')
const { auth, restrictTo } = require('../middleware/auth')

// a member's own profile
router.use(auth, restrictTo('member'))

router.get('/me', profileController.getMyProfile)
router.patch('/complete', profileController.completeProfile)
router.patch('/me', profileController.updateMyProfile)

module.exports = router;
