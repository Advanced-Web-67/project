const express = require('express');
const router = express.Router();
const authorization = require('../config/authorize'); // For authenticated requests
const Answer = require('../models/answer');

// Create a new answer
router.post('/create', authorization, async (req, res) => {
  try {
    const { answertext, question_id } = req.body;
    const user_id = req.user.id; // Assuming the user ID comes from the token after authorization

    // Create new answer instance
    const newAnswer = new Answer({
      answertext,
      question_id,
      user_id,
    });

    // Save answer to the database
    await newAnswer.save();

    res.status(201).json({ message: 'Answer created successfully', answer: newAnswer });
  } catch (error) {
    console.error('Error creating answer:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating answer', error: error.message }); // Return only the error message
  }
});

module.exports = router;
