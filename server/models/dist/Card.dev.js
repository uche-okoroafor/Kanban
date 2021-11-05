"use strict";

var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
  cardTitle: {
    type: String,
    required: true,
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
var Card = mongoose.model("card", cardSchema);
module.exports = Card;
