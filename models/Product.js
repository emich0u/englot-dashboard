const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imagePath: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  prizeFourn: {
    type: Number,
    required: true
  },
  prizeSell: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});
module.exports = Product = mongoose.model("products", ProductSchema);
