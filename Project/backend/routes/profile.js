const express = require('express');
const router = express.Router();

// Import your Mongoose models if needed
const Question = require('../models/question');
const Answer = require('../models/answer');
const User = require('../models/user');
// Example endpoint to get questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Example endpoint to get answers
router.get('/answers', async (req, res) => {
    try {
        const answers = await Answer.find();
        res.json(answers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;