"use strict";

var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
  cardTitle: {
    type: String,
    required: true,
  },
  tagColor: {
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
  cardComment: {
    type: String,
    required: false,
  },
});
var Card = mongoose.model("card", cardSchema);
module.exports = Card;
