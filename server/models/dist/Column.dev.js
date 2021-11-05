"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var columnSchema = new mongoose.Schema({
  columnTitle: {
    type: String,
    required: true,
  },
  cards: {
    type: Schema.Types.Array,
    ref: "card",
  },
});
var Column = mongoose.model("column", columnSchema);
module.exports = Column;
