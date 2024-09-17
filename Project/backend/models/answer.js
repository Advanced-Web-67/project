const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answertext: {
        type: String,
        required: true
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true }, {collection: 'answers'});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
