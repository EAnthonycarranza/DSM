const asyncHandler = require('express-async-handler');
const Note = require('../models/Note');
const Notification = require('../models/Notification'); // Add this line

// @desc Get notes by user ID
// @route GET /api/notes/:userId
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
});

// @desc Add a note
// @route POST /api/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
    const { userId, content } = req.body;

    const note = new Note({
        userId,
        content,
    });

    const createdNote = await note.save();

    // Create a notification
    const notification = new Notification({
        user: userId,
        message: `New note added: ${content}`,
    });
    await notification.save();

    res.status(201).json(createdNote);
});

module.exports = { getNotes, addNote };
