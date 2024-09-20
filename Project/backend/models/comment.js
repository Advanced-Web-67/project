const mongoose = require('mongoose');
const { type } = require('os');

const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  user_comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
