const express = require('express');
const { deleteUser, updateUser, registerAdmin, authAdmin, getUsers, getUserById } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(registerAdmin);
router.post('/login', authAdmin);
router.route('/users/:id').delete(protect, admin, deleteUser).put(protect, admin, updateUser).get(protect, admin, getUserById);
router.get('/users', protect, admin, getUsers); // Add this route to fetch all users

module.exports = router;
