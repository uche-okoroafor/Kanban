const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

exports.createChecklist = asyncHandler(async (req, res, next) => {
  const { checklistItem, cardId, columnId, boardId, userId } = req.body;
  if (!userId || !boardId || !columnId || !cardId || !checklistItem) {
    res.status(400);
    throw new Error(
      `${!columnId ? "columnId" : ""}${!cardId ? "cardId" : ""}${
        !boardId ? "boardId" : ""
      }${!userId ? "userId" : ""}${
        !checklistItem ? "checklistItem" : ""
      } is undefined`
    );
  }

  try {
    const createStatus = await User.updateOne(
      { _id: userId, "boards.columns.cards.cardId": cardId },
      {
        $push: {
          "boards.$[board].columns.$[column].cards.$[card].checklists": {
            [checklistItem]: false,
            checklistId: uuidv4(),
          },
        },
      },
      {
        arrayFilters: [
          { "board.boardId": boardId },
          { "column.columnId": columnId },
          { "card.cardId": cardId },
        ],
      }
    );
    res.status(200).json(createStatus);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

exports.updateChecklist = asyncHandler(async (req, res, next) => {
  const {
    checklistItem,
    isChecked,
    cardId,
    columnId,
    boardId,
    checklistId,
    userId,
  } = req.body;
  if (!cardId || !userId || !columnId || !boardId || !checklistId) {
    res.status(400);
    throw new Error(
      `${!columnId ? "columnId" : ""}${!cardId ? "cardId" : ""}${
        !boardId ? "boardId" : ""
      }${!userId ? "userId" : ""}${
        !checklistId ? "checklistId" : ""
      } is undefined`
    );
  }

  try {
    const targetItem = `boards.$[board].columns.$[column].cards.$[card].checklists.$[checklist].${checklistItem}`;
    const updateStatus = await User.updateOne(
      {
        _id: userId,
        "boards.columns.cards.checklists.checklistId": checklistId,
      },
      {
        $set: {
          [targetItem]: isChecked,
        },
      },
      {
        arrayFilters: [
          { "board.boardId": boardId },
          { "column.columnId": columnId },
          { "card.cardId": cardId },
          { "checklist.checklistId": checklistId },
        ],
      }
    );
    res.status(200).json(updateStatus);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

exports.removeChecklist = asyncHandler(async (req, res, next) => {
  const { cardId, columnId, boardId, checklistId, userId } = req.body;
  if (!cardId || !columnId || !boardId || !checklistId || !userId) {
    throw new Error(
      `${!columnId ? "columnId" : ""}${!cardId ? "cardId" : ""}${
        !boardId ? "boardId" : ""
      }${!userId ? "userId" : ""}${
        !checklistId ? "checklistId" : ""
      } is undefined`
    );
  }

  try {
    const targetItem =
      "boards.$[board].columns.$[column].cards.$[card].checklists";
    const removeStatus = await User.updateOne(
      {
        _id: userId,
        "boards.columns.cards.checklists.checklistId": checklistId,
      },

      {
        $pull: {
          [targetItem]: { checklistId: checklistId },
        },
      },
      {
        arrayFilters: [
          { "board.boardId": boardId },
          { "column.columnId": columnId },
          { "card.cardId": cardId },
        ],
      }
    );
    res.status(200).json(removeStatus);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
