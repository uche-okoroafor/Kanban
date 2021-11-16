const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardTitle: {
    type: String,
    required: true,
  },

  tagColor: {
    type: String,
  },
  cardDescription: {
    type: String,
  },
  cardDeadline: {
    type: Date,
    default: null,
  },

  comment: {

    type: String,
  },

});

const Card = mongoose.model("card", cardSchema);
module.exports = Card;
