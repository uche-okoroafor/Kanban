const User = require("../models/User");
const Board = require("../models/Board");
const asyncHandler = require("express-async-handler");
const ObjectID = require("mongodb").ObjectID;
const { board } = require("./defaultBoardContents/defaultBoardContents.json");

exports.createDefaultBoard = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const createBoard = await Board.create(board);

  const createStatus = await User.updateOne(
    { _id: userId },
    {
      $push: {
        boards: createBoard,
      },
    }
  );
  if (createStatus.nModified === 1) {
    return res.status(200).json({ success: true });
  }

  res.status(500);
  throw new Error("Something went wrong");
});

exports.addBoard = asyncHandler(async (req, res, next) => {
  const { userId, boardTitle } = req.params;

  const board = await Board.create({
    boardTitle,
  });
  const createStatus = await User.updateOne(
    { _id: userId },
    {
      $push: {
        boards: board,
      },
    }
  );
  if (createStatus.nModified === 1) {
    return res.status(200).json({ success: true });
  }
  res.status(500);
  throw new Error("Something went wrong");
});

exports.removeBoard = asyncHandler(async (req, res, next) => {
  const { boardId, userId } = req.params;

  const boardObjectId = ObjectID(boardId);

  const removeBoard = await Board.deleteOne({ _id: boardId });

  const removeStatus = await User.updateOne(
    { _id: userId, "boards._id": boardObjectId },
    {
      $pull: {
        boards: { _id: boardObjectId },
      },
    }
  );
  if (removeStatus.nModified === 1) {
    return res.status(200).json({ sucess: true, removeBoard });
  }

  res.status(500);
  throw new Error("Something went wrong");
});
