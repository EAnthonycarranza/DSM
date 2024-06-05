const express = require('express');
const router = express.Router();
const {
    getNotes,
    addNote,
    updateNote,
    deleteNote
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/:userId').get(protect, getNotes);
router.route('/').post(protect, addNote);
router.route('/:id').put(protect, updateNote).delete(protect, deleteNote);

module.exports = router;
