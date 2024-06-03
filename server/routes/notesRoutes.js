const express = require('express');
const { getNotes, addNote } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:userId').get(protect, getNotes);
router.route('/').post(protect, addNote);

module.exports = router;
