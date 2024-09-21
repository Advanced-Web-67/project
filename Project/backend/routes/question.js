const express = require('express');
const router = express.Router();
const Question = require('../models/question'); // Adjust path as needed
const authorization = require('../config/authorize'); // For authenticated requests

// Create a new question with base64 image
router.post('/create', authorization, async (req, res) => {
  try {
    const { title, body, tags, image } = req.body;
    const user_id = req.user.id; // Assuming the user ID comes from the token after authorization

    // Validate if the image is in base64 format
    if (image && !image.startsWith('data:image')) {
      return res.status(400).json({ message: 'Invalid image format' });
    }

    // Create new question instance
    const newQuestion = new Question({
      title,
      body,
      tags,
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

// Update a question by ID
router.put('/update/:id', authorization, async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const { title, body, tags, image } = req.body; // Get the updated data from the request body
    const user_id = req.user.id; // Assuming the user ID comes from the token after authorization

    // Validate if the image is in base64 format (if provided)
    if (image && !image.startsWith('data:image')) {
      return res.status(400).json({ message: 'Invalid image format' });
    }

    // Find the question by ID and update it
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { title, body, tags, image, user_id }, // Update fields
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Error updating question', error });
  }
});

// Delete a question by ID
router.delete('/delete/:id', authorization, async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters

    // Find the question by ID and delete it
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error });
  }
});



// Get all questions
router.get('/all', async (req, res) => {
  try {
    // Retrieve all questions from the database
    const questions = await Question.find();

    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
});

// Get question by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters

    // Find the question by ID
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question', error });
  }
});

// Get questions for a specific time range
router.get('/period/:period', async (req, res) => {
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


router.get('/byUser/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find questions created by the specified user
    const questions = await Question.find({ user_id });

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this user' });
    }

    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
}
});
// Get questions by tag (renamed to filterQuestions)
router.get('/questions/filter/:tag', async (req, res) => {

  const { tag } = req.params;
  Question.find({ tag: tag }, (err, questions) => {
    if (err) {
      return res.status(500).send({ message: 'Error retrieving questions' });
    }

    // If no questions found, return an empty array
    if (!questions || questions.length === 0) {
      return res.status(404).json([]);
    }

    // Return filtered questions
    res.json(questions);
  });
});

module.exports = router;
