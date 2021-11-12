"use strict";

var User = require("../models/User");

var asyncHandler = require("express-async-handler");

var _require = require("../models/Checklist"),
  ChecklistSchema = _require.ChecklistSchema; // @route POST /auth/register
// @desc Register user
// @access Public

exports.check = asyncHandler(function _callee(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          console.log("dbfbfhffnfnnf");
          _context.next = 3;
          return regeneratorRuntime.awrap(ChecklistSchema());

        case 3:
          user = _context.sent;

          if (!user) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(200).json(user));

        case 6:
          res.status(500);
          throw new Error("Invalid user data");

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
