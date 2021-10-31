const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const { boards } = require("./defaultBoardContents/defaultBoardContents.json");

exports.createDefaultBoard = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400);
    throw new Error("userId  is undefined");
  }

  const board = await User.updateOne(
    { _id: userId },
    {
      $push: {
        boards: boards,
      },
    }
  );
  res.status(200).json(board);
  res.status(500);
  throw new Error("Something went wrong");
});

exports.addBoard = asyncHandler(async (req, res, next) => {
  const { userId, boardTitle } = req.body;
  if (!userId) {
    res.status(400);
    throw new Error("userId  is undefined");
  }

  const board = await User.updateOne(
    { _id: userId },
    {
      $push: {
        boards: {
          boardTitle,
          boardId: uuidv4(),
        },
      },
    }
  );
  res.status(200).json(board);

  res.status(500);
  throw new Error("Something went wrong");
});

exports.removeBoard = asyncHandler(async (req, res, next) => {
  const { userId, boardId } = req.params;
  if (!boardId || !userId) {
    res.status(400);
    throw new Error(
      `${!boardId ? "boardId" : ""}  ${!userId ? "userId" : ""} is undefined`
    );
  }

  const board = await User.updateOne(
    { _id: userId, "boards.boardId": boardId },
    {
      $pull: {
        boards: { boardId: boardId },
      },
    }
  );
  res.status(200).json(board);
  res.status(500);
  throw new Error("Something went wrong");
});
