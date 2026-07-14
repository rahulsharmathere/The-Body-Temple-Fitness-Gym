const express = require('express')
const router = express.Router();
const planController = require('../controllers/membershipPlanController')
const { auth, restrictTo } = require('../middleware/auth')

router.get('/', planController.getPlans) // public, shown on the website too
router.post('/', auth, restrictTo('admin'), planController.createPlan)
router.patch('/:id', auth, restrictTo('admin'), planController.updatePlan)
router.delete('/:id', auth, restrictTo('admin'), planController.deletePlan)

module.exports = router;
