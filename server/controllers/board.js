const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const ObjectID = require("mongodb").ObjectID;
const { boards } = require("./defaultBoardContents/defaultBoardContents.json");

exports.createDefaultBoard = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  const board = await User.updateOne(
    { _id: userId },
    {
      $push: {
        boards: boards,
      },
    }
  );
  if (board.nModified === 1) {
    return res.status(200).json({ success: true });
  }

  res.status(500);
  throw new Error("Something went wrong");
});

exports.addBoard = asyncHandler(async (req, res, next) => {
  const { userId, boardTitle } = req.body;

  const board = await User.updateOne(
    { _id: userId },
    {
      $push: {
        boards: {
          boardTitle,
          _id: new ObjectID(),
        },
      },
    }
  );
  if (board.nModified === 1) {
    return res.status(200).json({ success: true });
  }
  res.status(500);
  throw new Error("Something went wrong");
});

exports.removeBoard = asyncHandler(async (req, res, next) => {
  const { boardId, userId } = req.params;
  const boardObjectId = ObjectID(boardId);
  const upBoard = await User.updateOne(
    { _id: userId, "boards._id": boardObjectId },
    {
      $pull: {
        boards: { _id: boardObjectId },
      },
    }
  );
  if (upBoard.nModified === 1) {
    return res.status(200).json({ success: true });
  }

  res.status(500);
  throw new Error("Something went wrong");
});
