const express = require('express')
const router = express.Router();
const memberController = require('../controllers/memberController')
const { auth, restrictTo } = require('../middleware/auth')

// admin-only member management
router.use(auth, restrictTo('admin'))

router.get('/', memberController.getAllMembers)
router.post('/', memberController.createMember)
router.get('/:id', memberController.getMemberById)
router.patch('/:id', memberController.updateMember)
router.delete('/:id', memberController.deleteMember)

module.exports = router;
