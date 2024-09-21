const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answertext: { type: String, required: true },
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'questions', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
