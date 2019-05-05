const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
      username: { type: String, unique: true, required: true },
      hash: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      lesson: { type: Number, required: true },
      createdDate: { type: Date, default: Date.now }
});
UserSchema.set('toJSON', { virtuals: true });

module.exports = User = mongoose.model("myUser", UserSchema);
