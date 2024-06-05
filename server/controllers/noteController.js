const asyncHandler = require('express-async-handler');
const Note = require('../models/Note');
const Notification = require('../models/Notification');

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

// @desc Update a note
// @route PUT /api/notes/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note) {
        note.content = req.body.content || note.content;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

// @desc Delete note
// @route DELETE /api/notes/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note) {
        await Note.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Note removed' });
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

module.exports = {
    getNotes,
    addNote,
    updateNote,
    deleteNote,
};
