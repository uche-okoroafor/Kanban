"use strict";

var User = require("../models/User");

var asyncHandler = require("express-async-handler");

var ObjectID = require("mongodb").ObjectID;

var Card = require("../models/Card");

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
