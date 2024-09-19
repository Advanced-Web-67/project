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

// Get questions for a specific time range
router.get('/:period', async (req, res) => {
  try {
      const { period } = req.params;
      let startDate;

      const now = new Date();
      if (period === 'week') {
          startDate = new Date(now.setDate(now.getDate() - 7));
      } else if (period === 'month') {
          startDate = new Date(now.setMonth(now.getMonth() - 1));
      }else if (period === 'day') {
        startDate = new Date(now.setDate(now.getDate() - 1)); // Use setDate() to get the start of the day
        startDate.setHours(0, 0, 0, 0); // Set the time to the start of the day
      } else {
          return res.status(400).send('Invalid period');
      }

      const questions = await Question.find({ createdAt: { $gte: startDate } });
      res.json(questions);
  } catch (error) {
      res.status(500).send(error.message);
  }
});


module.exports = router;
