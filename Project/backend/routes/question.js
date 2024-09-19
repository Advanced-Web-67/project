const express = require('express');
const router = express.Router();
const Question = require('../models/question'); // Adjust path as needed
const authorization = require('../config/authorize'); // For authenticated requests

// Create a new question with base64 image
router.post('/create', authorization, async (req, res) => {
  try {
    const { title, body, tag, image } = req.body;
    const user_id = req.user.id; // Assuming the user ID comes from the token after authorization

    // Validate if the image is in base64 format
    if (image && !image.startsWith('data:image')) {
      return res.status(400).json({ message: 'Invalid image format' });
    }

    // Create new question instance
    const newQuestion = new Question({
      title,
      body,
      tag,
      user_id,
      image // Store the base64 string of the image
    });

    // Save question to the database
    await newQuestion.save();

    res.status(201).json({ message: 'Question created successfully', question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Error creating question', error });
  }
});

module.exports = router;
