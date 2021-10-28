const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')

exports.createColumn = asyncHandler(async (req, res, next) => {
  const { columnTitle, userId, boardId } = req.body
  if (!columnTitle || !userId || !boardId) {
    res.status(404)
    throw new Error('columnTitle,userId, or boardId is undefined ')
  }
  try {
    const createStatus = await User.updateOne(
      {
        _id: userId,
        'boards.boardId': boardId
      },
      {
        $push: {
          'boards.$.columns': { columnTitle: columnTitle, columnId: uuidv4() }
        }
      }
    )

    res.status(200).json(createStatus)
  } catch (error) {
    res.status(400).json({ error })
  }
})

exports.updateColumn = asyncHandler(async (req, res, next) => {
  const { columnTitle, columnId, userId, boardId } = req.body
  if (!columnTitle || !columnId || !userId || !boardId) {
    res.status(404)
    throw new Error('columnTitle,columnId,userId, or boardId is undefined ')
  }
  try {
    const updateStatus = await User.updateOne(
      { _id: userId, 'boards.columns.columnId': columnId },
      {
        $set: {
          'boards.$[board].columns.$[column].columnTitle': columnTitle
        }
      },
      {
        arrayFilters: [
          { 'board.boardId': boardId },
          { 'column.columnId': columnId }
        ]
      }
    )
    res.status(200).json(updateStatus)
  } catch (error) {
    res.status(400).json({ error })
  }
})

exports.removeColumn = asyncHandler(async (req, res, next) => {
  const { columnId, userId, boardId } = req.body
  if (!columnId || !userId || !boardId) {
    res.status(404)
    throw new Error('columnId,userId, or boardId is undefined ')
  }
  try {
    const removeStatus = await User.updateOne(
      { _id: userId, 'boards.columns.columnId': columnId },
      {
        $pull: {
          'boards.$[board].columns': { columnId: columnId }
        }
      },
      {
        arrayFilters: [{ 'board.boardId': boardId }]
      }
    )
    res.status(200).json(removeStatus)
  } catch (error) {
    res.status(400).json({ error })
  }
})
