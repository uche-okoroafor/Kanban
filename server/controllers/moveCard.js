const User = require('../models/User')
const asyncHandler = require('express-async-handler')

exports.moveCardWithinColumn = asyncHandler(async (req, res, next) => {
  const {
    userId,
    cardId,
    columnId,
    boardId,
    targetPosition,
    cardObject
  } = req.body

  if (!cardId || !userId || !columnId || !boardId) {
    res.status(404)
    throw new Error('cardId,columnId ,userId or boardId is undefined')
  }

  try {
    const removeCard = await User.updateOne(
      {
        _id: userId,
        'boards.columns.cards.cardId': cardId
      },

      {
        $pull: {
          'boards.$[board].columns.$[column].cards': { cardId: cardId }
        }
      },
      {
        arrayFilters: [
          { 'board.boardId': boardId },
          { 'column.columnId': columnId }
        ]
      }
    ).catch(error => {
      res.status(400).json({ error })
    })

    if (removeCard.nModified === 1) {
      const moveStatus = await User.updateOne(
        { _id: userId, 'boards.columns.columnId': columnId },
        {
          $push: {
            'boards.$[board].columns.$[column].cards': {
              $each: [cardObject],
              $position: targetPosition
            }
          }
        },
        {
          arrayFilters: [
            { 'board.boardId': boardId },
            { 'column.columnId': columnId }
          ]
        }
      ).catch(error => {
        res.status(400).json({ error })
      })
      res.status(200).json(moveStatus)
    } else {
      res.status(400)
      throw new Error('card not moved')
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad request' })
  }
})

exports.moveCardOutsideColumn = asyncHandler(async (req, res, next) => {
  const {
    userId,
    cardId,
    initialColumnId,
    targetColumnId,
    boardId,
    targetPosition,
    cardObject
  } = req.body

  if (!cardId || !userId || !boardId || !initialColumnId || !targetColumnId) {
    res.status(404)
    throw new Error(
      'cardId,initialColumnId, targetColumnId,userId or boardId is undefined'
    )
  }
  try {
    const removeCard = await User.updateOne(
      {
        _id: userId,
        'boards.columns.cards.cardId': cardId
      },

      {
        $pull: {
          'boards.$[board].columns.$[column].cards': { cardId: cardId }
        }
      },
      {
        arrayFilters: [
          { 'board.boardId': boardId },
          { 'column.columnId': initialColumnId }
        ]
      }
    ).catch(error => {
      res.status(400).json({ error: 'Bad request' })
    })
    if (removeCard.nModified === 1) {
      const moveStatus = await User.updateOne(
        { _id: userId, 'boards.columns.columnId': targetColumnId },
        {
          $push: {
            'boards.$[board].columns.$[column].cards': {
              $each: [cardObject],
              $position: targetPosition
            }
          }
        },
        {
          arrayFilters: [
            { 'board.boardId': boardId },
            { 'column.columnId': targetColumnId }
          ]
        }
      ).catch(error => {
        res.status(400).json({ error: 'Bad request' })
      })
      res.status(200).json(moveStatus)
    } else {
      res.status(400)
      throw new Error('card not moved')
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad request' })
  }
})
