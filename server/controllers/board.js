const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')

exports.createBoard = asyncHandler(async (req, res, next) => {
  const { userId } = req.body
  if (!userId) {
    res.status(404)
    throw new Error('userId  is not defined')
  }

  try {
    const board = await User.updateOne(
      { _id: userId },
      {
        $push: {
          boards: {
            boardTitle: 'New Board',
            boardId: uuidv4(),
            columns: [
              {
                columnId: uuidv4(),
                columnTitle: 'In Progress',
                cards: [
                  {
                    cardId: uuidv4(),
                    cardTitle: 'New Card',
                    description: ''
                  }
                ]
              },
              {
                columnId: uuidv4(),
                columnTitle: 'Completed',
                cards: [
                  {
                    cardId: uuidv4(),
                    cardTitle: 'New Card',
                    description: ''
                  }
                ]
              }
            ]
          }
        }
      }
    )
    res.status(200).json(board)
  } catch (error) {
    res.status(400).json({ error })
  }
})

exports.removeBoard = asyncHandler(async (req, res, next) => {
  const { userId, boardId } = req.body
  if (!boardId || !userId) {
    res.status(404)
    throw new Error('boardId or userId  is not defined')
  }

  try {
    const board = await User.updateOne(
      { _id: userId },
      {
        $pull: {
          boards: { boardId: boardId }
        }
      }
    )
    res.status(200).json(board)
  } catch (error) {
    res.status(400).json({ error })
  }
})
