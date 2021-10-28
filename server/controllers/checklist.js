const User = require('../models/User')
const asyncHandler = require('express-async-handler')

exports.createChecklist = asyncHandler(async (req, res, next) => {
  const {
    checklistItem,
    cardId,
    columnId,
    boardId,
    checklistId,
    userId
  } = req.body
  if (!cardId || !userId || !columnId || !boardId || !checklistId || !userId) {
    return res.status(404).json({
      err: 'cardId,userId, columnId, boardId,userId or checklistId is undefined'
    })
  }

  try {
    const createStatus = await User.updateOne(
      { _id: userId, 'boards.columns.cards.cardId': cardId },
      {
        $push: {
          'boards.$[board].columns.$[column].cards.$[card].checklists': {
            [checklistItem]: false,
            checklistId: checklistId
          }
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
    res.status(200).json(createStatus)
  } catch (err) {
    res.status(400).json({ err })
  }
})

exports.updateChecklist = asyncHandler(async (req, res, next) => {
  const {
    checklistItem,
    isChecked,
    cardId,
    columnId,
    boardId,
    checklistId
  } = req.body
  if (!cardId || !userId || !columnId || !boardId || !checklistId || !userId) {
    return res.status(404).json({
      err: 'cardId,userId, columnId, boardId,userId or checklistId is undefined'
    })
  }

  try {
    const targetItem = `boards.$[board].columns.$[column].cards.$[card].checklists.$[checklist].${checklistItem}`
    const updateStatus = await User.updateOne(
      {
        _id: userId,
        'boards.columns.cards.checklists.checklistId': checklistId
      },
      {
        $set: {
          [targetItem]: isChecked
        }
      },
      {
        arrayFilters: [
          { 'board.boardId': boardId },
          { 'column.columnId': columnId },
          { 'card.cardId': cardId },
          { 'checklist.checklistId': checklistId }
        ]
      }
    )
    res.status(200).json(updateStatus)
  } catch (err) {
    res.status(400).json({ err })
  }
})

exports.removeChecklist = asyncHandler(async (req, res, next) => {
  const { cardId, columnId, boardId, checklistId, userId } = req.body
  if (!cardId || !columnId || !boardId || !checklistId || !userId) {
    return res.status(404).json({
      err: 'cardId, columnId, boardId,userId or checklistId is undefined'
    })
  }

  try {
    const targetItem =
      'boards.$[board].columns.$[column].cards.$[card].checklists'
    const removeStatus = await User.updateOne(
      {
        _id: userId,
        'boards.columns.cards.checklists.checklistId': checklistId
      },

      {
        $pull: {
          [targetItem]: { checklistId: checklistId }
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
    res.status(200).json(removeStatus)
  } catch (err) {
    res.status(400).json({ err })
  }
})
