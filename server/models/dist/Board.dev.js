"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var boardSchema = new mongoose.Schema({
  boardTitle: {
    type: String,
    required: true,
  },
  boardId: {
    type: String,
    required: false,
  },
  columns: {
    type: Schema.Types.Array,
    ref: "column",
  },
});
var Board = mongoose.model("board", boardSchema);
module.exports = Board;
