const express = require('express');
const router = express.Router();
const authorization = require('../config/authorize'); // For authenticated requests
const Answer = require('../models/answer');

// Create a new question with base64 image
router.post('/create', authorization, async (req, res) => {
  try {
    const { answertext,question_id } = req.body;
    const user_id = req.user.id; // Assuming the user ID comes from the token after authorization

    // Create new question instance
    const newAnswer = new Answer({
    answertext,
    question_id,
    user_id,
    });

    // Save question to the database
    await newAnswer.save();

    res.status(201).json({ message: 'Answer created successfully', question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Answer', error });
  }
});

module.exports = router;
