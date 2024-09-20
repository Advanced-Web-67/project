const express = require('express');
const router = express.Router();
const Comment = require('../models/comment')

router.post('/create', async (req, res) => {
    try {
      const { commentText, user_id, user_comment_id } = req.body;
      const comment = new Comment({
        commentText,
        user_id,
        user_comment_id
      });

      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating comment', error });
    }
});

module.exports = router;
