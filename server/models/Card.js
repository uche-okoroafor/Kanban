const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  comment: {
    type: String,
  },
});

const Card = mongoose.model("card", cardSchema);
module.exports = Card;
