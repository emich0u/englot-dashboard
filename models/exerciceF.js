const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    question: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    correctAns: { type: String, required: true },
    lesson: { type: Number, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('exerciseF', schema);
