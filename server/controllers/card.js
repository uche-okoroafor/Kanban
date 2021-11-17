const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const ObjectID = require("mongodb").ObjectID;
const Card = require("../models/Card");

exports.createCard = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const { cardTitle, tagColor, columnId, boardId } = req.params;

  const columnObjectId = ObjectID(columnId);
  const boardObjectId = ObjectID(boardId);

  const createCard = await Card.create({ name: cardTitle, tag: tagColor });
  const createStatus = await User.updateOne(
    { _id: userId, "boards.columns._id": columnObjectId },
    {
      $push: {
        "boards.$[board].columns.$[column].cards": createCard,
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
  const userId = req.user.id;
  const { cardItem, value, cardId, columnId, boardId } = req.body;
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
  const userId = req.user.id;

  const { cardItem, cardId } = req.body;

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
