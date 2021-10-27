const User = require('../models/User')
const asyncHandler = require('express-async-handler')

exports.createCard = asyncHandler(async (req, res, next) => {
  const { cardTitle, tagColor, cardId, columnId, boardId } = req.body

  if (!cardId || !columnId || !boardId) {
    res.status(400)
    throw new Error('cardId,columnId or boardId is undefined')
  }
  try {
    const card = await User.updateOne(
      { 'boards.columns.columnId': columnId },
      {
        $push: {
          'boards.$[board].columns.$[column].cards': {
            cardId: cardId,
            cardTitle: cardTitle,
            tagColor: tagColor
          }
        }
      },
      {
        arrayFilters: [
          { 'board.boardId': boardId },
          { 'column.columnId': columnId }
        ]
      }
    )
    res.status(200).json(card)
  } catch (err) {
    res.status(400).json({ err })
  }
})

exports.updateCardItems = asyncHandler(async (req, res, next) => {
  const { cardItem, value, cardId, columnId, boardId } = req.body

  if (!cardId || !columnId || !boardId) {
    res.status(400)
    throw new Error('cardId,columnId or boardId is undefined')
  }
  try {
    const targetItem = `boards.$[board].columns.$[column].cards.$[card].${cardItem}`
    const card = await User.updateOne(
      { 'boards.columns.cards.cardId': cardId },
      {
        $set: {
          [targetItem]: value
        }
      },
      {
        arrayFilters: [
          { 'board.boardId': boardId },
          { 'column.columnId': columnId },
          { 'card.cardId': cardId }
        ]
      }
    )
    res.status(200).json(card)
  } catch (err) {
    res.status(400).json({ err })
  }
})


exports.removeCardItems = asyncHandler(async (req, res, next) => {
  const { cardItem, value, cardId, columnId, boardId } = req.body
  console.log(cardItem, value, cardId, columnId, boardId)

  if (!cardId || !columnId || !boardId) {
    res.status(400)
    throw new Error('cardId,columnId or boardId is undefined')
  }
  try {
    const targetItem = `boards.$[board].columns.$[column].cards.$[card].${cardItem}`
    const card = await User.updateOne(
      { 'boards.columns.cards.cardId': cardId },
      {
        $pull: {
          [targetItem]: value
        }
      },
      {
        arrayFilters: [
          { 'board.boardId': boardId },
          { 'column.columnId': columnId },
          { 'card.cardId': cardId }
        ]
      }
    )
    res.status(200).json(card)
  } catch (err) {
    res.status(400).json({ err })
  }
})
