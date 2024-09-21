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

// Get answers by question ID
router.get('/byQuestion/:question_id', async (req, res) => {
  try {
    const { question_id } = req.params;

    // Find answers by question ID
    const answers = await Answer.find({ question_id }).populate('user_id', 'username'); // Populate user info if necessary

    if (answers.length === 0) {
      return res.status(404).json({ message: 'No answers found for this question' });
    }

    res.status(200).json({ message: 'Answers retrieved successfully', answers });
  } catch (error) {
    console.error('Error retrieving answers:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error retrieving answers', error: error.message }); // Return only the error message
  }
});

module.exports = router;
