const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tag: [String],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true }, {collection: 'questions'});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
