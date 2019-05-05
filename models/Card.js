const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products"
      }
    }
  ],
  nameProduct: {
    type: String
  },
  totPrize: {
    type: Number
  },
  totQte: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Card = mongoose.model("card", CardSchema);
