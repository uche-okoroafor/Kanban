const User = require("../models/User");
const asyncHandler = require("express-async-handler");
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
