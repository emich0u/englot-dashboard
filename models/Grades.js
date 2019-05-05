const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: { type: String, unique: false, required: true },
    questionId: { type: String, unique: false, required: true },
    grade: { type: Number, unique: false, required: true },
    lesson: { type: Number, unique: false, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('grade', schema);
