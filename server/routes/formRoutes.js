const express = require('express');
const asyncHandler = require('express-async-handler');
const Form = require('../models/Form');
const router = express.Router();

// Create a new form
router.post('/', asyncHandler(async (req, res) => {
    const { userId, formData } = req.body;
    const form = new Form({
        userId,
        formData
    });

    const createdForm = await form.save();
    res.status(201).json(createdForm);
}));

// Get forms for a specific user
router.get('/:userId', asyncHandler(async (req, res) => {
    const forms = await Form.find({ userId: req.params.userId });
    res.json(forms);
}));

module.exports = router;
