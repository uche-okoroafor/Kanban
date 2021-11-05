const User = require("../models/User");
const Column = require("../models/Column");

const asyncHandler = require("express-async-handler");
const ObjectID = require("mongodb").ObjectID;

exports.createColumn = asyncHandler(async (req, res, next) => {
  const { columnTitle, userId, boardId } = req.params;

  const column = await Column.create({
    columnTitle: columnTitle,
  });

  const boardObjectId = ObjectID(boardId);
  const createStatus = await User.updateOne(
    {
      _id: userId,
      "boards._id": boardObjectId,
    },
    {
      $push: {
        "boards.$.columns": column,
      },
    }
  );

  if (createStatus.nModified === 1) {
    return res.status(200).json({ success: true });
  }
  res.status(500);
  throw new Error("Something went wrong");
});

exports.updateColumn = asyncHandler(async (req, res, next) => {
  const { columnTitle, columnId, userId, boardId } = req.body;
  const boardObjectId = ObjectID(boardId);
  const columnObjectId = ObjectID(columnId);

  const updateColumn = await Column.updateOne(
    { _id: columnId },
    {
      $set: { columnTitle: columnTitle },
    }
  );
  const updateStatus = await User.updateOne(
    { _id: userId, "boards.columns._id": columnObjectId },
    {
      $set: {
        "boards.$[board].columns.$[column].columnTitle": columnTitle,
      },
    },
    {
      arrayFilters: [
        { "board._id": boardObjectId },
        { "column._id": columnObjectId },
      ],
    }
  );
  if (updateStatus.nModified === 1) {
    return res.status(200).json({ success: true, updateColumn });
  }
  res.status(500);
  throw new Error("Something went wrong");
});

exports.removeColumn = asyncHandler(async (req, res, next) => {
  const { columnId, userId, boardId } = req.params;
  const boardObjectId = ObjectID(boardId);
  const columnObjectId = ObjectID(columnId);

  const removeColumn = await Column.deleteOne({ _id: columnId });
  const removeStatus = await User.updateOne(
    { _id: userId, "boards.columns._id": columnObjectId },
    {
      $pull: {
        "boards.$[board].columns": { _id: columnObjectId },
      },
    },
    {
      arrayFilters: [{ "board._id": boardObjectId }],
    }
  );
  if (removeStatus.nModified === 1) {
    return res.status(200).json({ success: true, removeColumn });
  }

  res.status(500);
  throw new Error("Something went wrong");
});

exports.moveColumn = asyncHandler(async (req, res, next) => {
  const { userId, columnId, boardId, targetPosition, columnObject } = req.body;
  const boardObjectId = ObjectID(boardId);
  const columnObjectId = ObjectID(columnId);
  columnObject._id = ObjectID(columnObject._id);
  const removeColumn = await User.updateOne(
    {
      _id: userId,
      "boards.columns._id": columnObjectId,
    },

    {
      $pull: {
        "boards.$[board].columns": { _id: columnObjectId },
      },
    },
    {
      arrayFilters: [{ "board._id": boardObjectId }],
    }
  );

  if (removeColumn.nModified === 1) {
    const moveStatus = await User.updateOne(
      { _id: userId, "boards._id": boardObjectId },
      {
        $push: {
          "boards.$[board].columns": {
            $each: [columnObject],
            $position: targetPosition,
          },
        },
      },
      {
        arrayFilters: [{ "board._id": boardObjectId }],
      }
    );
    if (moveStatus.nModified === 1) {
      return res.status(200).json({ success: true });
    }
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
  const boardObjectId = ObjectID(boardId);
  const columnObjectId = ObjectID(columnId);
  const cardObjectId = ObjectID(cardId);
  cardObject._id = ObjectID(cardObject._id);

  const removeCard = await User.updateOne(
    {
      _id: userId,
      "boards.columns.cards._id": cardObjectId,
    },

    {
      $pull: {
        "boards.$[board].columns.$[column].cards": { _id: cardObjectId },
      },
    },
    {
      arrayFilters: [
        { "board._id": boardObjectId },
        { "column._id": columnObjectId },
      ],
    }
  );

  if (removeCard.nModified === 1) {
    const moveStatus = await User.updateOne(
      { _id: userId, "boards.columns._id": columnObjectId },
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
          { "board._id": boardObjectId },
          { "column._id": columnObjectId },
        ],
      }
    );
    if (moveStatus.nModified === 1) {
      return res.status(200).json({ success: true });
    }
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

  const boardObjectId = ObjectID(boardId);
  const cardObjectId = ObjectID(cardId);
  const initialColumnObjectId = ObjectID(initialColumnId);
  const targetColumnObjectId = ObjectID(targetColumnId);
  cardObject._id = ObjectID(cardObject._id);
  const removeCard = await User.updateOne(
    {
      _id: userId,
      "boards.columns.cards._id": cardObjectId,
    },

    {
      $pull: {
        "boards.$[board].columns.$[column].cards": { _id: cardObjectId },
      },
    },
    {
      arrayFilters: [
        { "board._id": boardObjectId },
        { "column._id": initialColumnObjectId },
      ],
    }
  );

  if (removeCard.nModified === 1) {
    const moveStatus = await User.updateOne(
      { _id: userId, "boards.columns._id": targetColumnObjectId },
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
          { "board._id": boardObjectId },
          { "column._id": targetColumnObjectId },
        ],
      }
    );
    if (moveStatus.nModified === 1) {
      return res.status(200).json({ success: true });
    } else {
      const returnCard = await User.updateOne(
        {
          _id: userId,
          "boards.columns._id": initialColumnObjectId,
        },

        {
          $push: {
            "boards.$[board].columns.$[column].cards": cardObject,
          },
        },
        {
          arrayFilters: [
            { "board._id": boardObjectId },
            { "column._id": initialColumnObjectId },
          ],
        }
      );
      res.status(400);
      throw new Error(`card not moved ${returnCard.nModified}`);
    }
  } else {
    res.status(400);
    throw new Error("card not moved");
  }
  res.status(500);
  throw new Error("Something went wrong");
});
