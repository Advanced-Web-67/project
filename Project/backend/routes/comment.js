const express = require('express');
const router = express.Router();
const Comment = require('../models/comment')

router.post('/create', async (req, res) => {
    try {
      const { commentText, user_id, user_comment_id, picture, username } = req.body;
      const comment = new Comment({
        commentText,
        user_id,
        user_comment_id,
        picture,
        username
      });

      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating comment', error });
    }
});

// Route to get comments by user_id
router.get('/comment/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;  // Extract user_id from the request params
    const comments = await Comment.find({ user_id });  // Query the database for comments by user_id

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this user' });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
});

// Delete comment by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const commentId = req.params.id;
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
});


module.exports = router;
