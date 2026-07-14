const express = require('express')
const router = express.Router();
const membershipController = require('../controllers/membershipController')
const { auth, restrictTo } = require('../middleware/auth')

router.get('/me', auth, restrictTo('member'), membershipController.getMyMembership)

router.post('/', auth, restrictTo('admin'), membershipController.assignMembership)
router.patch('/member/:userId/renew', auth, restrictTo('admin'), membershipController.renewMembership)
router.get('/member/:userId', auth, restrictTo('admin'), membershipController.getMembershipHistoryForMember)
router.get('/expiring-soon', auth, restrictTo('admin'), membershipController.getExpiringSoon)
router.get('/expired', auth, restrictTo('admin'), membershipController.getExpired)

module.exports = router;
