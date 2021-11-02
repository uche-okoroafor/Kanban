const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const ObjectID = require("mongodb").ObjectID;

exports.createCard = asyncHandler(async (req, res, next) => {
  const { cardTitle, tagColor, userId, columnId, boardId } = req.body;

  const card = await User.updateOne(
    { _id: userId, "boards.columns.columnId": columnId },
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
        { "board.boardId": boardId },
        { "column.columnId": columnId },
      ],
    }
  );

  res.status(200).json(card);
  res.status(500);
  throw new Error("Something went wrong");
});
