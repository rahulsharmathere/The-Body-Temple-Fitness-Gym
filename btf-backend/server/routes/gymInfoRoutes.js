const express = require('express')
const router = express.Router();
const gymInfoController = require('../controllers/gymInfoController')
const { auth, restrictTo } = require('../middleware/auth')

router.get('/', gymInfoController.getGymInfo) // public, shown on the website
router.patch('/', auth, restrictTo('admin'), gymInfoController.updateGymInfo)
router.post('/gallery', auth, restrictTo('admin'), gymInfoController.addGalleryImage)
router.delete('/gallery/:index', auth, restrictTo('admin'), gymInfoController.removeGalleryImage)

module.exports = router;
