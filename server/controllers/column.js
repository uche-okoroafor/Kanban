const User = require('../models/User')
const Column = require('../models/Column')

const asyncHandler = require('express-async-handler')
const ObjectID = require('mongodb').ObjectID

exports.createColumn = asyncHandler(async (req, res, next) => {
  const userId = req.user.id

  const { columnTitle, boardId, targetPosition } = req.body

  const column = await Column.create({
    columnTitle: columnTitle
  })

  const boardObjectId = ObjectID(boardId)

  const createStatus = await User.updateOne(
    { _id: userId, 'boards._id': boardObjectId },
    {
      $push: {
        'boards.$[board].columns': {
          $each: [column],
          $position: targetPosition
        }
      }
    },
    {
      arrayFilters: [{ 'board._id': boardObjectId }]
    }
  )

  if (createStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('Something went wrong')
})

exports.updateColumn = asyncHandler(async (req, res, next) => {
  const userId = req.user.id

  const { columnTitle, columnId, boardId } = req.body
  const boardObjectId = ObjectID(boardId)
  const columnObjectId = ObjectID(columnId)

  const updateColumn = await Column.updateOne(
    { _id: columnId },
    {
      $set: { columnTitle: columnTitle }
    }
  )
  const updateStatus = await User.updateOne(
    { _id: userId, 'boards.columns._id': columnObjectId },
    {
      $set: {
        'boards.$[board].columns.$[column].columnTitle': columnTitle
      }
    },
    {
      arrayFilters: [
        { 'board._id': boardObjectId },
        { 'column._id': columnObjectId }
      ]
    }
  )
  if (updateStatus.nModified === 1) {
    return res.status(200).json({ success: true, updateColumn })
  }
  res.status(500)
  throw new Error('Something went wrong')
})

exports.removeColumn = asyncHandler(async (req, res, next) => {
  const userId = req.user.id

  const { columnId, boardId } = req.params
  const boardObjectId = ObjectID(boardId)
  const columnObjectId = ObjectID(columnId)

  const removeColumn = await Column.deleteOne({ _id: columnId })
  const removeStatus = await User.updateOne(
    { _id: userId, 'boards.columns._id': columnObjectId },
    {
      $pull: {
        'boards.$[board].columns': { _id: columnObjectId }
      }
    },
    {
      arrayFilters: [{ 'board._id': boardObjectId }]
    }
  )
  if (removeStatus.nModified === 1) {
    return res.status(200).json({ success: true, removeColumn })
  }

  res.status(500)
  throw new Error('Something went wrong')
})

exports.moveColumn = asyncHandler(async (req, res, next) => {
  const userId = req.user.id

  const { columnId, boardId, targetPosition, column } = req.body
  const boardObjectId = ObjectID(boardId)
  const columnObjectId = ObjectID(columnId)
  column._id = ObjectID(column._id)

  await column.cards.forEach(card => {
    card._id = ObjectID(card._id)
  })

  const removeColumn = await User.updateOne(
    {
      _id: userId,
      'boards.columns._id': columnObjectId
    },

    {
      $pull: {
        'boards.$[board].columns': { _id: columnObjectId }
      }
    },
    {
      arrayFilters: [{ 'board._id': boardObjectId }]
    }
  )

  if (removeColumn.nModified === 1) {
    const moveStatus = await User.updateOne(
      { _id: userId, 'boards._id': boardObjectId },
      {
        $push: {
          'boards.$[board].columns': {
            $each: [column],
            $position: targetPosition
          }
        }
      },
      {
        arrayFilters: [{ 'board._id': boardObjectId }]
      }
    )
    if (moveStatus.nModified === 1) {
      return res.status(200).json({ success: true })
    }
  } else {
    res.status(400)
    throw new Error('column not moved')
  }
  res.status(500)
  throw new Error('Something went wrong')
})

exports.moveCardWithinColumn = asyncHandler(async (req, res, next) => {
  const userId = req.user.id

  const { cardId, columnId, boardId, targetPosition, card } = req.body
  const boardObjectId = ObjectID(boardId)
  const columnObjectId = ObjectID(columnId)
  const cardObjectId = ObjectID(cardId)
  card._id = ObjectID(card._id)

  const removeCard = await User.updateOne(
    {
      _id: userId,
      'boards.columns.cards._id': cardObjectId
    },

    {
      $pull: {
        'boards.$[board].columns.$[column].cards': { _id: cardObjectId }
      }
    },
    {
      arrayFilters: [
        { 'board._id': boardObjectId },
        { 'column._id': columnObjectId }
      ]
    }
  )

  if (removeCard.nModified === 1) {
    const moveStatus = await User.updateOne(
      { _id: userId, 'boards.columns._id': columnObjectId },
      {
        $push: {
          'boards.$[board].columns.$[column].cards': {
            $each: [card],
            $position: targetPosition
          }
        }
      },
      {
        arrayFilters: [
          { 'board._id': boardObjectId },
          { 'column._id': columnObjectId }
        ]
      }
    )
    if (moveStatus.nModified === 1) {
      return res.status(200).json({ success: true })
    } else {
      const returnCard = await User.updateOne(
        {
          _id: userId,
          'boards.columns._id': columnObjectId
        },

        {
          $push: {
            'boards.$[board].columns.$[column].cards': card
          }
        },
        {
          arrayFilters: [
            { 'board._id': boardObjectId },
            { 'column._id': columnObjectId }
          ]
        }
      )

      if (returnCard.nModified === 1) {
        res.status(400)
        throw new Error('card not moved')
      }
    }
  } else {
    res.status(400)
    throw new Error('card not moved')
  }
  res.status(500)
  throw new Error('Something went wrong')
})

exports.moveCardOutsideColumn = asyncHandler(async (req, res, next) => {
  const userId = req.user.id

  const {
    cardId,
    initialColumnId,
    targetColumnId,
    boardId,
    targetPosition,
    card
  } = req.body

  const boardObjectId = ObjectID(boardId)
  const cardObjectId = ObjectID(cardId)
  const initialColumnObjectId = ObjectID(initialColumnId)
  const targetColumnObjectId = ObjectID(targetColumnId)
  card._id = ObjectID(card._id)
  const removeCard = await User.updateOne(
    {
      _id: userId,
      'boards.columns.cards._id': cardObjectId
    },

    {
      $pull: {
        'boards.$[board].columns.$[column].cards': { _id: cardObjectId }
      }
    },
    {
      arrayFilters: [
        { 'board._id': boardObjectId },
        { 'column._id': initialColumnObjectId }
      ]
    }
  )

  if (removeCard.nModified === 1) {
    const moveStatus = await User.updateOne(
      { _id: userId, 'boards.columns._id': targetColumnObjectId },
      {
        $push: {
          'boards.$[board].columns.$[column].cards': {
            $each: [card],
            $position: targetPosition
          }
        }
      },
      {
        arrayFilters: [
          { 'board._id': boardObjectId },
          { 'column._id': targetColumnObjectId }
        ]
      }
    )
    if (moveStatus.nModified === 1) {
      return res.status(200).json({ success: true })
    } else {
      const returnCard = await User.updateOne(
        {
          _id: userId,
          'boards.columns._id': initialColumnObjectId
        },

        {
          $push: {
            'boards.$[board].columns.$[column].cards': card
          }
        },
        {
          arrayFilters: [
            { 'board._id': boardObjectId },
            { 'column._id': initialColumnObjectId }
          ]
        }
      )
      res.status(400)
      throw new Error(`card not moved ${returnCard.nModified}`)
    }
  } else {
    res.status(400)
    throw new Error('card not moved')
  }
  res.status(500)
  throw new Error('Something went wrong')
})
