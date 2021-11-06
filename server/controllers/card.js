const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const ObjectID = require("mongodb").ObjectID;
const Card = require("../models/Card");

exports.createCard = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const { cardTitle, tagColor, columnId, boardId } = req.params;

  const columnObjectId = ObjectID(columnId);
  const boardObjectId = ObjectID(boardId);

  const createCard = await Card.create({ cardTitle, tagColor });
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
