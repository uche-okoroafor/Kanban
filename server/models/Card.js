const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  cardTitle: {
    type: String,
    required: false
  },
  cardId: {
    type: String,
    required: false
  },
  tagColor: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  deadline: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String,
    required: false
  },
  attachment: {
    type: String,
    required: false
  },
  checklist: [
    {
      itemId: {
        type: String,
        required: false
      },
      item: {
        type: String,
        required: false
      },
      checkBox: {
        type: Boolean,
        required: false
      }
    }
  ]
})

const Card = mongoose.model('card', cardSchema)
module.exports = Card
