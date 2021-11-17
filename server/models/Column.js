const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cards: { type: Schema.Types.Array, ref: "card" },
});

const Column = mongoose.model("column", columnSchema);
module.exports = Column;
