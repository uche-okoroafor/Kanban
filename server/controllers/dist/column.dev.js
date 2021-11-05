"use strict";

var User = require("../models/User");

var Column = require("../models/Column");

var asyncHandler = require("express-async-handler");

var ObjectID = require("mongodb").ObjectID;

exports.createColumn = asyncHandler(function _callee(req, res, next) {
  var _req$params,
    columnTitle,
    userId,
    boardId,
    column,
    boardObjectId,
    createStatus;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          (_req$params = req.params),
            (columnTitle = _req$params.columnTitle),
            (userId = _req$params.userId),
            (boardId = _req$params.boardId);
          _context.next = 3;
          return regeneratorRuntime.awrap(
            Column.create({
              columnTitle: columnTitle,
            })
          );

        case 3:
          column = _context.sent;
          boardObjectId = ObjectID(boardId);
          _context.next = 7;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards._id": boardObjectId,
              },
              {
                $push: {
                  "boards.$.columns": column,
                },
              }
            )
          );

        case 7:
          createStatus = _context.sent;

          if (!(createStatus.nModified === 1)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt(
            "return",
            res.status(200).json({
              success: true,
            })
          );

        case 10:
          res.status(500);
          throw new Error("Something went wrong");

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.updateColumn = asyncHandler(function _callee2(req, res, next) {
  var _req$body,
    columnTitle,
    columnId,
    userId,
    boardId,
    boardObjectId,
    columnObjectId,
    updateColumn,
    updateStatus;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          (_req$body = req.body),
            (columnTitle = _req$body.columnTitle),
            (columnId = _req$body.columnId),
            (userId = _req$body.userId),
            (boardId = _req$body.boardId);
          boardObjectId = ObjectID(boardId);
          columnObjectId = ObjectID(columnId);
          _context2.next = 5;
          return regeneratorRuntime.awrap(
            Column.updateOne(
              {
                _id: columnId,
              },
              {
                $set: {
                  columnTitle: columnTitle,
                },
              }
            )
          );

        case 5:
          updateColumn = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns._id": columnObjectId,
              },
              {
                $set: {
                  "boards.$[board].columns.$[column].columnTitle": columnTitle,
                },
              },
              {
                arrayFilters: [
                  {
                    "board._id": boardObjectId,
                  },
                  {
                    "column._id": columnObjectId,
                  },
                ],
              }
            )
          );

        case 8:
          updateStatus = _context2.sent;

          if (!(updateStatus.nModified === 1)) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt(
            "return",
            res.status(200).json({
              success: true,
              updateColumn: updateColumn,
            })
          );

        case 11:
          res.status(500);
          throw new Error("Something went wrong");

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.removeColumn = asyncHandler(function _callee3(req, res, next) {
  var _req$params2,
    columnId,
    userId,
    boardId,
    boardObjectId,
    columnObjectId,
    removeColumn,
    removeStatus;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch ((_context3.prev = _context3.next)) {
        case 0:
          (_req$params2 = req.params),
            (columnId = _req$params2.columnId),
            (userId = _req$params2.userId),
            (boardId = _req$params2.boardId);
          boardObjectId = ObjectID(boardId);
          columnObjectId = ObjectID(columnId);
          _context3.next = 5;
          return regeneratorRuntime.awrap(
            Column.deleteOne({
              _id: columnId,
            })
          );

        case 5:
          removeColumn = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns._id": columnObjectId,
              },
              {
                $pull: {
                  "boards.$[board].columns": {
                    _id: columnObjectId,
                  },
                },
              },
              {
                arrayFilters: [
                  {
                    "board._id": boardObjectId,
                  },
                ],
              }
            )
          );

        case 8:
          removeStatus = _context3.sent;

          if (!(removeStatus.nModified === 1)) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt(
            "return",
            res.status(200).json({
              success: true,
              removeColumn: removeColumn,
            })
          );

        case 11:
          res.status(500);
          throw new Error("Something went wrong");

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.moveColumn = asyncHandler(function _callee4(req, res, next) {
  var _req$body2,
    userId,
    columnId,
    boardId,
    targetPosition,
    columnObject,
    boardObjectId,
    columnObjectId,
    removeColumn,
    moveStatus;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch ((_context4.prev = _context4.next)) {
        case 0:
          (_req$body2 = req.body),
            (userId = _req$body2.userId),
            (columnId = _req$body2.columnId),
            (boardId = _req$body2.boardId),
            (targetPosition = _req$body2.targetPosition),
            (columnObject = _req$body2.columnObject);
          boardObjectId = ObjectID(boardId);
          columnObjectId = ObjectID(columnId);
          columnObject._id = ObjectID(columnObject._id);
          _context4.next = 6;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns._id": columnObjectId,
              },
              {
                $pull: {
                  "boards.$[board].columns": {
                    _id: columnObjectId,
                  },
                },
              },
              {
                arrayFilters: [
                  {
                    "board._id": boardObjectId,
                  },
                ],
              }
            )
          );

        case 6:
          removeColumn = _context4.sent;

          if (!(removeColumn.nModified === 1)) {
            _context4.next = 15;
            break;
          }

          _context4.next = 10;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards._id": boardObjectId,
              },
              {
                $push: {
                  "boards.$[board].columns": {
                    $each: [columnObject],
                    $position: targetPosition,
                  },
                },
              },
              {
                arrayFilters: [
                  {
                    "board._id": boardObjectId,
                  },
                ],
              }
            )
          );

        case 10:
          moveStatus = _context4.sent;

          if (!(moveStatus.nModified === 1)) {
            _context4.next = 13;
            break;
          }

          return _context4.abrupt(
            "return",
            res.status(200).json({
              success: true,
            })
          );

        case 13:
          _context4.next = 17;
          break;

        case 15:
          res.status(400);
          throw new Error("column not moved");

        case 17:
          res.status(500);
          throw new Error("Something went wrong");

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.moveCardWithinColumn = asyncHandler(function _callee5(req, res, next) {
  var _req$body3,
    userId,
    cardId,
    columnId,
    boardId,
    targetPosition,
    cardObject,
    boardObjectId,
    columnObjectId,
    cardObjectId,
    removeCard,
    moveStatus;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch ((_context5.prev = _context5.next)) {
        case 0:
          (_req$body3 = req.body),
            (userId = _req$body3.userId),
            (cardId = _req$body3.cardId),
            (columnId = _req$body3.columnId),
            (boardId = _req$body3.boardId),
            (targetPosition = _req$body3.targetPosition),
            (cardObject = _req$body3.cardObject);
          boardObjectId = ObjectID(boardId);
          columnObjectId = ObjectID(columnId);
          cardObjectId = ObjectID(cardId);
          cardObject._id = ObjectID(cardObject._id);
          _context5.next = 7;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns.cards._id": cardObjectId,
              },
              {
                $pull: {
                  "boards.$[board].columns.$[column].cards": {
                    _id: cardObjectId,
                  },
                },
              },
              {
                arrayFilters: [
                  {
                    "board._id": boardObjectId,
                  },
                  {
                    "column._id": columnObjectId,
                  },
                ],
              }
            )
          );

        case 7:
          removeCard = _context5.sent;

          if (!(removeCard.nModified === 1)) {
            _context5.next = 16;
            break;
          }

          _context5.next = 11;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns._id": columnObjectId,
              },
              {
                $push: {
                  "boards.$[board].columns.$[column].cards": {
                    $each: [cardObject],
                    $position: targetPosition,
                  },
                },
              },
              {
                arrayFilters: [
                  {
                    "board._id": boardObjectId,
                  },
                  {
                    "column._id": columnObjectId,
                  },
                ],
              }
            )
          );

        case 11:
          moveStatus = _context5.sent;

          if (!(moveStatus.nModified === 1)) {
            _context5.next = 14;
            break;
          }

          return _context5.abrupt(
            "return",
            res.status(200).json({
              success: true,
            })
          );

        case 14:
          _context5.next = 18;
          break;

        case 16:
          res.status(400);
          throw new Error("card not moved");

        case 18:
          res.status(500);
          throw new Error("Something went wrong");

        case 20:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.moveCardOutsideColumn = asyncHandler(function _callee6(req, res, next) {
  var _req$body4,
    userId,
    cardId,
    initialColumnId,
    targetColumnId,
    boardId,
    targetPosition,
    cardObject,
    boardObjectId,
    cardObjectId,
    initialColumnObjectId,
    targetColumnObjectId,
    removeCard,
    moveStatus,
    returnCard;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch ((_context6.prev = _context6.next)) {
        case 0:
          (_req$body4 = req.body),
            (userId = _req$body4.userId),
            (cardId = _req$body4.cardId),
            (initialColumnId = _req$body4.initialColumnId),
            (targetColumnId = _req$body4.targetColumnId),
            (boardId = _req$body4.boardId),
            (targetPosition = _req$body4.targetPosition),
            (cardObject = _req$body4.cardObject);
          boardObjectId = ObjectID(boardId);
          cardObjectId = ObjectID(cardId);
          initialColumnObjectId = ObjectID(initialColumnId);
          targetColumnObjectId = ObjectID(targetColumnId);
          cardObject._id = ObjectID(cardObject._id);
          _context6.next = 8;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns.cards._id": cardObjectId,
              },
              {
                $pull: {
                  "boards.$[board].columns.$[column].cards": {
                    _id: cardObjectId,
                  },
                },
              },
              {
                arrayFilters: [
                  {
                    "board._id": boardObjectId,
                  },
                  {
                    "column._id": initialColumnObjectId,
                  },
                ],
              }
            )
          );

        case 8:
          removeCard = _context6.sent;

          if (!(removeCard.nModified === 1)) {
            _context6.next = 24;
            break;
          }

          _context6.next = 12;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns._id": targetColumnObjectId,
              },
              {
                $push: {
                  "boards.$[board].columns.$[column].cards": {
                    $each: [cardObject],
                    $position: targetPosition,
                  },
                },
              },
              {
                arrayFilters: [
                  {
                    "board._id": boardObjectId,
                  },
                  {
                    "column._id": targetColumnObjectId,
                  },
                ],
              }
            )
          );

        case 12:
          moveStatus = _context6.sent;

          if (!(moveStatus.nModified === 1)) {
            _context6.next = 17;
            break;
          }

          return _context6.abrupt(
            "return",
            res.status(200).json({
              success: true,
            })
          );

        case 17:
          _context6.next = 19;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns._id": initialColumnObjectId,
              },
              {
                $push: {
                  "boards.$[board].columns.$[column].cards": cardObject,
                },
              },
              {
                arrayFilters: [
                  {
                    "board._id": boardObjectId,
                  },
                  {
                    "column._id": initialColumnObjectId,
                  },
                ],
              }
            )
          );

        case 19:
          returnCard = _context6.sent;
          res.status(400);
          throw new Error("card not moved ".concat(returnCard.nModified));

        case 22:
          _context6.next = 26;
          break;

        case 24:
          res.status(400);
          throw new Error("card not moved");

        case 26:
          res.status(500);
          throw new Error("Something went wrong");

        case 28:
        case "end":
          return _context6.stop();
      }
    }
  });
});
