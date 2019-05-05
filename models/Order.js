const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const OrderSchema = new Schema({
  orders: [
    {
      Card: {
        type: Schema.Types.ObjectId,
        ref: "cards"
      }
    }
  ]
});
module.exports = Order = mongoose.model("order", OrderSchema);
