const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const cloud = require("../config/cloudinaryConfig");
const ObjectID = require("mongodb").ObjectID;

exports.createCard = asyncHandler(async (req, res, next) => {
  const { cardTitle, tagColor, userId, columnId, boardId } = req.body;

  const columnObjectId = ObjectID(columnId);
  const boardObjectId = ObjectID(boardId);
  const createStatus = await User.updateOne(
    { _id: userId, "boards.columns._id": columnObjectId },
    {
      $push: {
        "boards.$[board].columns.$[column].cards": {
          _id: new ObjectID(),
          cardTitle: cardTitle,
          tagColor: tagColor,
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

  if (createStatus.nModified === 1) {
    return res.status(200).json({ success: true });
  }

  res.status(500);
  throw new Error("Something went wrong");
});

exports.updateCardItems = asyncHandler(async (req, res, next) => {
  const { userId, cardItem, value, cardId, columnId, boardId } = req.body;
  const columnObjectId = ObjectID(columnId);
  const boardObjectId = ObjectID(boardId);
  const cardObjectId = ObjectID(cardId);
  const targetItem = `boards.$[board].columns.$[column].cards.$[card].${cardItem}`;
  const updateStatus = await User.updateOne(
    { _id: userId, "boards.columns.cards._id": cardObjectId },
    {
      $set: {
        [targetItem]: value,
      },
    },
    {
      arrayFilters: [
        { "board._id": boardObjectId },
        { "column._id": columnObjectId },
        { "card._id": cardObjectId },
      ],
    }
  );

  if (updateStatus.nModified === 1) {
    return res.status(200).json({ success: true });
  }

  res.status(500);
  throw new Error("Something went wrong");
});

exports.removeCardItems = asyncHandler(async (req, res, next) => {
  const { cardItem, userId, cardId } = req.body;

  const cardObjectId = ObjectID(cardId);
  const getDocumentIndex = (document) => {
    for (const boardIndex in document[0].boards) {
      for (const columnIndex in document[0].boards[boardIndex].columns) {
        for (const cardIndex in document[0].boards[boardIndex].columns[
          columnIndex
        ].cards) {
          const documentCardId =
            document[0].boards[boardIndex].columns[columnIndex].cards[cardIndex]
              ._id;
          if (documentCardId.toString() === cardObjectId.toString()) {
            return {
              boardIndex,
              columnIndex,
              cardIndex,
            };
          }
        }
      }
    }
  };

  const document = await User.find({
    _id: userId,
    "boards.columns.cards._id": cardObjectId,
  });
  const { boardIndex, columnIndex, cardIndex } = getDocumentIndex(document);

  const targetItem = `boards.${boardIndex}.columns.${columnIndex}.cards.${cardIndex}.${cardItem}`;

  const removeStatus = await User.updateOne(
    { _id: userId, "boards.columns.cards._id": cardObjectId },
    {
      $unset: { [targetItem]: "" },
    }
  );
  if (removeStatus.nModified === 1) {
    return res.status(200).json({ success: true });
  }
  res.status(500);
  throw new Error("Something went wrong");
});

exports.createChecklist = asyncHandler(async (req, res, next) => {
  const { checklistItem, cardId, columnId, boardId, userId } = req.body;
  const columnObjectId = ObjectID(columnId);
  const boardObjectId = ObjectID(boardId);
  const cardObjectId = ObjectID(cardId);
  const createStatus = await User.updateOne(
    { _id: userId, "boards.columns.cards._id": cardObjectId },
    {
      $push: {
        "boards.$[board].columns.$[column].cards.$[card].checklists": {
          [checklistItem]: false,
          _id: new ObjectID(),
        },
      },
    },
    {
      arrayFilters: [
        { "board._id": boardObjectId },
        { "column._id": columnObjectId },
        { "card._id": cardObjectId },
      ],
    }
  );

  if (createStatus.nModified === 1) {
    return res.status(200).json({ success: true });
  }
  res.status(500);
  throw new Error("Something went wrong");
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

  const boardObjectId = ObjectID(boardId);
  const columnObjectId = ObjectID(columnId);
  const cardObjectId = ObjectID(cardId);
  const checklistObjectId = ObjectID(checklistId);

  const targetItem = `boards.$[board].columns.$[column].cards.$[card].checklists.$[checklist].${checklistItem}`;
  const updateStatus = await User.updateOne(
    {
      _id: userId,
      "boards.columns.cards.checklists._id": checklistObjectId,
    },
    {
      $set: {
        [targetItem]: isChecked,
      },
    },
    {
      arrayFilters: [
        { "board._id": boardObjectId },
        { "column._id": columnObjectId },
        { "card._id": cardObjectId },
        { "checklist._id": checklistObjectId },
      ],
    }
  );
  if (updateStatus.nModified === 1) {
    return res.status(200).json({ success: true });
  }

  res.status(500);
  throw new Error("Something went wrong");
});

exports.removeChecklist = asyncHandler(async (req, res, next) => {
  const { cardId, columnId, boardId, checklistId, userId } = req.body;
  const boardObjectId = ObjectID(boardId);
  const columnObjectId = ObjectID(columnId);
  const cardObjectId = ObjectID(cardId);
  const checklistObjectId = ObjectID(checklistId);

  const targetItem =
    "boards.$[board].columns.$[column].cards.$[card].checklists";
  const removeStatus = await User.updateOne(
    {
      _id: userId,
      "boards.columns.cards.checklists._id": checklistObjectId,
    },

    {
      $pull: {
        [targetItem]: { _id: checklistObjectId },
      },
    },
    {
      arrayFilters: [
        { "board._id": boardObjectId },
        { "column._id": columnObjectId },
        { "card._id": cardObjectId },
      ],
    }
  );
  if (removeStatus.nModified === 1) {
    return res.status(200).json({ success: true });
  }

  res.status(500);
  throw new Error("Something went wrong");
});
