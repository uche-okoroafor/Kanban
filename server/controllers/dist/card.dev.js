"use strict";

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var User = require("../models/User");

var Card = require("../models/Card");

var asyncHandler = require("express-async-handler");

var ObjectID = require("mongodb").ObjectID;

exports.createCard = asyncHandler(function _callee(req, res, next) {
  var _req$params,
    cardTitle,
    tagColor,
    userId,
    columnId,
    boardId,
    columnObjectId,
    boardObjectId,
    createCard,
    createStatus;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          (_req$params = req.params),
            (cardTitle = _req$params.cardTitle),
            (tagColor = _req$params.tagColor),
            (userId = _req$params.userId),
            (columnId = _req$params.columnId),
            (boardId = _req$params.boardId);
          columnObjectId = ObjectID(columnId);
          boardObjectId = ObjectID(boardId);
          _context.next = 5;
          return regeneratorRuntime.awrap(
            Card.create({
              cardTitle: cardTitle,
              tagColor: tagColor,
            })
          );

        case 5:
          createCard = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns._id": columnObjectId,
              },
              {
                $push: {
                  "boards.$[board].columns.$[column].cards": createCard,
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
          createStatus = _context.sent;

          if (!(createStatus.nModified === 1)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt(
            "return",
            res.status(200).json({
              success: true,
            })
          );

        case 11:
          res.status(500);
          throw new Error("Something went wrong");

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.updateCardItems = asyncHandler(function _callee2(req, res, next) {
  var _req$body,
    userId,
    cardItem,
    value,
    cardId,
    columnId,
    boardId,
    columnObjectId,
    boardObjectId,
    cardObjectId,
    targetItem,
    updateStatus;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          (_req$body = req.body),
            (userId = _req$body.userId),
            (cardItem = _req$body.cardItem),
            (value = _req$body.value),
            (cardId = _req$body.cardId),
            (columnId = _req$body.columnId),
            (boardId = _req$body.boardId);
          columnObjectId = ObjectID(columnId);
          boardObjectId = ObjectID(boardId);
          cardObjectId = ObjectID(cardId);
          targetItem =
            "boards.$[board].columns.$[column].cards.$[card].".concat(cardItem);
          _context2.next = 7;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns.cards._id": cardObjectId,
              },
              {
                $set: _defineProperty({}, targetItem, value),
              },
              {
                arrayFilters: [
                  {
                    "board._id": boardObjectId,
                  },
                  {
                    "column._id": columnObjectId,
                  },
                  {
                    "card._id": cardObjectId,
                  },
                ],
              }
            )
          );

        case 7:
          updateStatus = _context2.sent;

          if (!(updateStatus.nModified === 1)) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt(
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
          return _context2.stop();
      }
    }
  });
});
exports.removeCardItems = asyncHandler(function _callee3(req, res, next) {
  var _req$body2,
    cardItem,
    userId,
    cardId,
    cardObjectId,
    getDocumentIndex,
    document,
    _getDocumentIndex,
    boardIndex,
    columnIndex,
    cardIndex,
    targetItem,
    removeStatus;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch ((_context3.prev = _context3.next)) {
        case 0:
          (_req$body2 = req.body),
            (cardItem = _req$body2.cardItem),
            (userId = _req$body2.userId),
            (cardId = _req$body2.cardId);
          cardObjectId = ObjectID(cardId);

          getDocumentIndex = function getDocumentIndex(document) {
            for (var _boardIndex in document[0].boards) {
              for (var _columnIndex in document[0].boards[_boardIndex]
                .columns) {
                for (var _cardIndex in document[0].boards[_boardIndex].columns[
                  _columnIndex
                ].cards) {
                  var documentCardId =
                    document[0].boards[_boardIndex].columns[_columnIndex].cards[
                      _cardIndex
                    ]._id;

                  if (documentCardId.toString() === cardObjectId.toString()) {
                    return {
                      boardIndex: _boardIndex,
                      columnIndex: _columnIndex,
                      cardIndex: _cardIndex,
                    };
                  }
                }
              }
            }
          };

          _context3.next = 5;
          return regeneratorRuntime.awrap(
            User.find({
              _id: userId,
              "boards.columns.cards._id": cardObjectId,
            })
          );

        case 5:
          document = _context3.sent;
          (_getDocumentIndex = getDocumentIndex(document)),
            (boardIndex = _getDocumentIndex.boardIndex),
            (columnIndex = _getDocumentIndex.columnIndex),
            (cardIndex = _getDocumentIndex.cardIndex);
          targetItem = "boards."
            .concat(boardIndex, ".columns.")
            .concat(columnIndex, ".cards.")
            .concat(cardIndex, ".")
            .concat(cardItem);
          _context3.next = 10;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns.cards._id": cardObjectId,
              },
              {
                $unset: _defineProperty({}, targetItem, ""),
              }
            )
          );

        case 10:
          removeStatus = _context3.sent;

          if (!(removeStatus.nModified === 1)) {
            _context3.next = 13;
            break;
          }

          return _context3.abrupt(
            "return",
            res.status(200).json({
              success: true,
            })
          );

        case 13:
          res.status(500);
          throw new Error("Something went wrong");

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
});
