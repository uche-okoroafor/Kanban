const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const ObjectID = require("mongodb").ObjectID;

exports.createColumn = asyncHandler(async (req, res, next) => {
  const { columnTitle, userId, boardId } = req.body;

  const createStatus = await User.updateOne(
    {
      _id: userId,
      "boards.boardId": boardId,
    },
    {
      $push: {
        "boards.$.columns": { columnTitle: columnTitle, _id: new ObjectID() },
      },
    }
  );

  res.status(200).json(createStatus);
  res.status(500);
  throw new Error("Something went wrong");
});

exports.updateColumn = asyncHandler(async (req, res, next) => {
  const { columnTitle, columnId, userId, boardId } = req.body;

  const updateStatus = await User.updateOne(
    { _id: userId, "boards.columns.columnId": columnId },
    {
      $set: {
        "boards.$[board].columns.$[column].columnTitle": columnTitle,
      },
    },
    {
      arrayFilters: [
        { "board.boardId": boardId },
        { "column.columnId": columnId },
      ],
    }
  );
  res.status(200).json(updateStatus);
  res.status(500);
  throw new Error("Something went wrong");
});

exports.removeColumn = asyncHandler(async (req, res, next) => {
  const { columnId, userId, boardId } = req.body;

  const removeStatus = await User.updateOne(
    { _id: userId, "boards.columns.columnId": columnId },
    {
      $pull: {
        "boards.$[board].columns": { columnId: columnId },
      },
    },
    {
      arrayFilters: [{ "board.boardId": boardId }],
    }
  );
  res.status(200).json(removeStatus);

  res.status(500);
  throw new Error("Something went wrong");
});

exports.moveColumn = asyncHandler(async (req, res, next) => {
  const { userId, columnId, boardId, targetPosition, columnObject } = req.body;

  const removeColumn = await User.updateOne(
    {
      _id: userId,
      "boards.columns.columnId": columnId,
    },

    {
      $pull: {
        "boards.$[board].columns": { columnId: columnId },
      },
    },
    {
      arrayFilters: [{ "board.boardId": boardId }],
    }
  );

  if (removeColumn.nModified === 1) {
    const moveStatus = await User.updateOne(
      { _id: userId, "boards.boardId": boardId },
      {
        $push: {
          "boards.$[board].columns": {
            $each: [columnObject],
            $position: targetPosition,
          },
        },
      },
      {
        arrayFilters: [{ "board.boardId": boardId }],
      }
    );
    res.status(200).json(moveStatus);
  } else {
    res.status(400);
    throw new Error("column not moved");
  }
  res.status(500);
  throw new Error("Something went wrong");
});

exports.moveCardWithinColumn = asyncHandler(async (req, res, next) => {
  const { userId, cardId, columnId, boardId, targetPosition, cardObject } =
    req.body;

  const removeCard = await User.updateOne(
    {
      _id: userId,
      "boards.columns.cards.cardId": cardId,
    },

    {
      $pull: {
        "boards.$[board].columns.$[column].cards": { cardId: cardId },
      },
    },
    {
      arrayFilters: [
        { "board.boardId": boardId },
        { "column.columnId": columnId },
      ],
    }
  );

  if (removeCard.nModified === 1) {
    const moveStatus = await User.updateOne(
      { _id: userId, "boards.columns.columnId": columnId },
      {
        $push: {
          "boards.$[board].columns.$[column].cards": {
            $each: [cardObject],
            $position: targetPosition,
          },
        },
      },
      {
        arrayFilters: [
          { "board.boardId": boardId },
          { "column.columnId": columnId },
        ],
      }
    );
    res.status(200).json(moveStatus);
  } else {
    res.status(400);
    throw new Error("card not moved");
  }
  res.status(500);
  throw new Error("Something went wrong");
});

exports.moveCardOutsideColumn = asyncHandler(async (req, res, next) => {
  const {
    userId,
    cardId,
    initialColumnId,
    targetColumnId,
    boardId,
    targetPosition,
    cardObject,
  } = req.body;

  const removeCard = await User.updateOne(
    {
      _id: userId,
      "boards.columns.cards.cardId": cardId,
    },

    {
      $pull: {
        "boards.$[board].columns.$[column].cards": { cardId: cardId },
      },
    },
    {
      arrayFilters: [
        { "board.boardId": boardId },
        { "column.columnId": initialColumnId },
      ],
    }
  );

  if (removeCard.nModified === 1) {
    const moveStatus = await User.updateOne(
      { _id: userId, "boards.columns.columnId": targetColumnId },
      {
        $push: {
          "boards.$[board].columns.$[column].cards": {
            $each: [cardObject],
            $position: targetPosition,
          },
        },
      },
      {
        arrayFilters: [
          { "board.boardId": boardId },
          { "column.columnId": targetColumnId },
        ],
      }
    );

    res.status(200).json(moveStatus);
  } else {
    res.status(400);
    throw new Error("card not moved");
  }
  res.status(500);
  throw new Error("Something went wrong");
});
