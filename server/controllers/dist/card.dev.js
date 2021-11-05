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

var fs = require("fs");

var util = require("util");

var unlinkFile = util.promisify(fs.unlink);

var cloud = require("../config/cloudinaryConfig");

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
    itemContent,
    imageObject,
    uploadStatus,
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
          itemContent = value;

          if (!(cardItem === "attachment")) {
            _context2.next = 13;
            break;
          }

          imageObject = {
            imageName: req.files[0].originalname,
            imageUrl: req.files[0].path,
            imageId: "",
          };
          _context2.next = 9;
          return regeneratorRuntime.awrap(cloud.uploads(imageObject.imageUrl));

        case 9:
          uploadStatus = _context2.sent;
          itemContent = {
            imageName: req.files[0].originalname,
            imageUrl: uploadStatus.url,
            imageId: uploadStatus.id,
          };
          _context2.next = 13;
          return regeneratorRuntime.awrap(unlinkFile(req.files[0].path));

        case 13:
          targetItem =
            "boards.$[board].columns.$[column].cards.$[card].".concat(cardItem);
          _context2.next = 16;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns.cards._id": cardObjectId,
              },
              {
                $set: _defineProperty({}, targetItem, itemContent),
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

        case 16:
          updateStatus = _context2.sent;

          if (!(updateStatus.nModified === 1)) {
            _context2.next = 19;
            break;
          }

          return _context2.abrupt(
            "return",
            res.status(200).json({
              success: true,
            })
          );

        case 19:
          res.status(500);
          throw new Error("Something went wrong");

        case 21:
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
exports.createChecklist = asyncHandler(function _callee4(req, res, next) {
  var _boards$BoardColu;

  var _req$body3,
    checklistItem,
    cardId,
    columnId,
    boardId,
    userId,
    columnObjectId,
    boardObjectId,
    cardObjectId,
    createStatus;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch ((_context4.prev = _context4.next)) {
        case 0:
          (_req$body3 = req.body),
            (checklistItem = _req$body3.checklistItem),
            (cardId = _req$body3.cardId),
            (columnId = _req$body3.columnId),
            (boardId = _req$body3.boardId),
            (userId = _req$body3.userId);
          columnObjectId = ObjectID(columnId);
          boardObjectId = ObjectID(boardId);
          cardObjectId = ObjectID(cardId);
          _context4.next = 6;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns.cards._id": cardObjectId,
              },
              {
                $push: {
                  "boards.$[board].columns.$[column].cards.$[card].checklists":
                    ((_boards$BoardColu = {}),
                    _defineProperty(_boards$BoardColu, checklistItem, false),
                    _defineProperty(_boards$BoardColu, "_id", new ObjectID()),
                    _boards$BoardColu),
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
                  {
                    "card._id": cardObjectId,
                  },
                ],
              }
            )
          );

        case 6:
          createStatus = _context4.sent;

          if (!(createStatus.nModified === 1)) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt(
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
          return _context4.stop();
      }
    }
  });
});
exports.updateChecklist = asyncHandler(function _callee5(req, res, next) {
  var _req$body4,
    checklistItem,
    isChecked,
    cardId,
    columnId,
    boardId,
    checklistId,
    userId,
    boardObjectId,
    columnObjectId,
    cardObjectId,
    checklistObjectId,
    targetItem,
    updateStatus;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch ((_context5.prev = _context5.next)) {
        case 0:
          (_req$body4 = req.body),
            (checklistItem = _req$body4.checklistItem),
            (isChecked = _req$body4.isChecked),
            (cardId = _req$body4.cardId),
            (columnId = _req$body4.columnId),
            (boardId = _req$body4.boardId),
            (checklistId = _req$body4.checklistId),
            (userId = _req$body4.userId);
          boardObjectId = ObjectID(boardId);
          columnObjectId = ObjectID(columnId);
          cardObjectId = ObjectID(cardId);
          checklistObjectId = ObjectID(checklistId);
          targetItem =
            "boards.$[board].columns.$[column].cards.$[card].checklists.$[checklist].".concat(
              checklistItem
            );
          _context5.next = 8;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns.cards.checklists._id": checklistObjectId,
              },
              {
                $set: _defineProperty({}, targetItem, isChecked),
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
                  {
                    "checklist._id": checklistObjectId,
                  },
                ],
              }
            )
          );

        case 8:
          updateStatus = _context5.sent;

          if (!(updateStatus.nModified === 1)) {
            _context5.next = 11;
            break;
          }

          return _context5.abrupt(
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
          return _context5.stop();
      }
    }
  });
});
exports.removeChecklist = asyncHandler(function _callee6(req, res, next) {
  var _req$body5,
    cardId,
    columnId,
    boardId,
    checklistId,
    userId,
    boardObjectId,
    columnObjectId,
    cardObjectId,
    checklistObjectId,
    targetItem,
    removeStatus;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch ((_context6.prev = _context6.next)) {
        case 0:
          (_req$body5 = req.body),
            (cardId = _req$body5.cardId),
            (columnId = _req$body5.columnId),
            (boardId = _req$body5.boardId),
            (checklistId = _req$body5.checklistId),
            (userId = _req$body5.userId);
          boardObjectId = ObjectID(boardId);
          columnObjectId = ObjectID(columnId);
          cardObjectId = ObjectID(cardId);
          checklistObjectId = ObjectID(checklistId);
          targetItem =
            "boards.$[board].columns.$[column].cards.$[card].checklists";
          _context6.next = 8;
          return regeneratorRuntime.awrap(
            User.updateOne(
              {
                _id: userId,
                "boards.columns.cards.checklists._id": checklistObjectId,
              },
              {
                $pull: _defineProperty({}, targetItem, {
                  _id: checklistObjectId,
                }),
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

        case 8:
          removeStatus = _context6.sent;

          if (!(removeStatus.nModified === 1)) {
            _context6.next = 11;
            break;
          }

          return _context6.abrupt(
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
          return _context6.stop();
      }
    }
  });
});
