const User = require('../models/User')
const Board = require('../models/Board')
const Column = require('../models/Column')
const Card = require('../models/Card')
const asyncHandler = require('express-async-handler')
const ObjectID = require('mongodb').ObjectID
const {
  board,
  columnProgress,
  columnCompleted,
  card
} = require('./defaultBoardContents/defaultBoardContents.json')

exports.getUserBoard = asyncHandler(async (req, res, next) => {
  const userId = req.user.id
  console.log(req.user.id)

  const userBoards = await User.findById(userId)
  if (userBoards) {
    return res.status(200).json({ boards: userBoards.boards })
  }
  res.status(500)
  throw new Error('Something went wrong')
})

exports.createDefaultBoard = asyncHandler(async (req, res, next) => {
  const userId = req.user.id

  const createBoard = new Board(board)
  const createColumnProgress = new Column(columnProgress)
  const createColumnCompleted = new Column(columnCompleted)
  const createCard = new Card(card)

  createColumnProgress.cards.push(createCard)
  createColumnCompleted.cards.push(createCard)
  createBoard.columns = [createColumnProgress, createColumnCompleted]

  const createStatus = await User.updateOne(
    { _id: userId },
    {
      $push: {
        boards: createBoard
      }
    }
  )
  if (createStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }

  res.status(500)
  throw new Error('Something went wrong')
})

exports.addBoard = asyncHandler(async (req, res, next) => {
  const userId = req.user.id

  const { boardTitle } = req.params

  const board = await Board.create({
    boardTitle
  })
  const createStatus = await User.updateOne(
    { _id: userId },
    {
      $push: {
        boards: board
      }
    }
  )
  if (createStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('Something went wrong')
})

exports.removeBoard = asyncHandler(async (req, res, next) => {
  const userId = req.user.id

  const { boardId } = req.params

  const boardObjectId = ObjectID(boardId)

  const removeBoard = await Board.deleteOne({ _id: boardId })

  const removeStatus = await User.updateOne(
    { _id: userId, 'boards._id': boardObjectId },
    {
      $pull: {
        boards: { _id: boardObjectId }
      }
    }
  )
  if (removeStatus.nModified === 1) {
    return res.status(200).json({ sucess: true, removeBoard })
  }

  res.status(500)
  throw new Error('Something went wrong')
})
