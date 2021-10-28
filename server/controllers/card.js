const User = require('../models/User')
const asyncHandler = require('express-async-handler')

exports.createCard = asyncHandler(async (req, res, next) => {
  const { cardTitle, tagColor, userId, cardId, columnId, boardId } = req.body

  if (!cardId || !columnId || !userId || !boardId) {
    res.status(404)
    throw new Error('cardId,columnId,userId or boardId is undefined')
  }
  try {
    const card = await User.updateOne(
      { _id: userId, 'boards.columns.columnId': columnId },
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
  const { userId, cardItem, value, cardId, columnId, boardId } = req.body

  if (!cardId || !userId || !columnId || !boardId) {
    res.status(404)
    throw new Error('cardId,columnId ,userId or boardId is undefined')
  }

  try {
    const targetItem = `boards.$[board].columns.$[column].cards.$[card].${cardItem}`

    const updateStatus = await User.updateOne(
      { _id: userId, 'boards.columns.cards.cardId': cardId },
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

    res.status(200).json(updateStatus)
  } catch (err) {
    res.status(400).json({ err })
  }
})

exports.removeCardItems = asyncHandler(async (req, res, next) => {
  const { cardItem, userId, cardId, columnId, boardId } = req.body

  if (!cardId || !columnId || !boardId || !userId) {
    res.status(404)
    throw new Error('cardId,columnId,userId or boardId is undefined')
  }

  try {
    const getDocumentIndex = document => {
      for (const boardIndex in document[0].boards) {
        for (const columnIndex in document[0].boards[boardIndex].columns) {
          for (const cardIndex in document[0].boards[boardIndex].columns[
            columnIndex
          ].cards) {
            const documentCardId =
              document[0].boards[boardIndex].columns[columnIndex].cards[
                cardIndex
              ].cardId

            if (documentCardId === cardId) {
              return {
                boardIndex,
                columnIndex,
                cardIndex
              }
            }
          }
        }
      }
    }

    const document = await User.find({
      _id: userId,
      'boards.columns.cards.cardId': cardId
    }).catch(err => res.status(400).json({ err }))

    const { boardIndex, columnIndex, cardIndex } = getDocumentIndex(document)

    const targetItem = `boards.${boardIndex}.columns.${columnIndex}.cards.${cardIndex}.${cardItem}`

    const removeStatus = await User.updateOne(
      { _id: userId, 'boards.columns.cards.cardId': cardId },
      {
        $unset: { [targetItem]: '' }
      }
    )

    res.status(200).json(removeStatus)
  } catch (err) {
    res.status(400).json({ err })
  }
})
