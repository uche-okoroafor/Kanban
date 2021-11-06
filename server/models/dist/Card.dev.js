"use strict";

var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
  cardTitle: {
    type: String,
    required: true,
  },
  cardColor: {
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
var Card = mongoose.model("card", cardSchema);
module.exports = Card;
