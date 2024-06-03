const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
