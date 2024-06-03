const express = require('express');
const {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
    updatePersonalInfo,
    getPersonalInfo,
    getUsers,
    updateUser,
    deleteUser,
    getUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/personalinfo').get(protect, getPersonalInfo).put(protect, updatePersonalInfo);
router.route('/:id').get(protect, getUser).put(protect, admin, updateUser).delete(protect, admin, deleteUser);

module.exports = router;
