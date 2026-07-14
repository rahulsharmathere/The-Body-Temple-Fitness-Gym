const express = require('express')
const router = express.Router();
const progressController = require('../controllers/progressController')
const { auth, restrictTo } = require('../middleware/auth')

router.use(auth, restrictTo('member'))

router.post('/', progressController.addWeightEntry)
router.get('/me', progressController.getMyWeightHistory)

module.exports = router;
