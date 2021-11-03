const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardTitle: {
    type: String,
    required: false,
  },
  cardColor: {
    type: String,
    required: false,
  },
  cardDescription: {
    type: String,
    required: false,
  },
  cardDeadline: {
    type: Date,
    default: null,
  },
  comment: {
    type: String,
    required: false,
  },
});

const Card = mongoose.model("card", cardSchema);
module.exports = Card;
