const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const columnSchema = new mongoose.Schema({
  columnTitle: {
    Types: String,
    required: false,
  },
  cards: { type: Schema.Types.Array, ref: "card" },
});

const Column = mongoose.model("column", columnSchema);
module.exports = Column;
