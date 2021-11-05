"use strict";

var User = require("../models/User");

var Board = require("../models/Board");

var asyncHandler = require("express-async-handler");

var ObjectID = require("mongodb").ObjectID;

var _require = require("./defaultBoardContents/defaultBoardContents.json"),
  board = _require.board;

exports.createDefaultBoard = asyncHandler(function _callee(req, res, next) {
  var userId, createBoard, createStatus;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          userId = req.params.userId;
          _context.next = 3;
          return regeneratorRuntime.awrap(Board.create(board));

        case 3:
          createBoard = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
              },
              {
                $push: {
                  boards: createBoard,
                },
              }
            )
          );

        case 6:
          createStatus = _context.sent;

          if (!(createStatus.nModified === 1)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt(
            "return",
            res.status(200).json({
              success: true,
            })
          );

        case 9:
          res.status(500);
          throw new Error("Something went wrong");

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.addBoard = asyncHandler(function _callee2(req, res, next) {
  var _req$params, userId, boardTitle, board, createStatus;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          (_req$params = req.params),
            (userId = _req$params.userId),
            (boardTitle = _req$params.boardTitle);
          _context2.next = 3;
          return regeneratorRuntime.awrap(
            Board.create({
              boardTitle: boardTitle,
            })
          );

        case 3:
          board = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
              },
              {
                $push: {
                  boards: board,
                },
              }
            )
          );

        case 6:
          createStatus = _context2.sent;

          if (!(createStatus.nModified === 1)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt(
            "return",
            res.status(200).json({
              success: true,
            })
          );

        case 9:
          res.status(500);
          throw new Error("Something went wrong");

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.removeBoard = asyncHandler(function _callee3(req, res, next) {
  var _req$params2, boardId, userId, boardObjectId, removeBoard, removeStatus;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch ((_context3.prev = _context3.next)) {
        case 0:
          (_req$params2 = req.params),
            (boardId = _req$params2.boardId),
            (userId = _req$params2.userId);
          boardObjectId = ObjectID(boardId);
          _context3.next = 4;
          return regeneratorRuntime.awrap(
            Board.deleteOne({
              _id: boardId,
            })
          );

        case 4:
          removeBoard = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards._id": boardObjectId,
              },
              {
                $pull: {
                  boards: {
                    _id: boardObjectId,
                  },
                },
              }
            )
          );

        case 7:
          removeStatus = _context3.sent;

          if (!(removeStatus.nModified === 1)) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt(
            "return",
            res.status(200).json({
              sucess: true,
              removeBoard: removeBoard,
            })
          );

        case 10:
          res.status(500);
          throw new Error("Something went wrong");

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
});
