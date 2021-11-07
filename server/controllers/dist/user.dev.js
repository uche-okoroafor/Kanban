"use strict";

var User = require("../models/User");

var asyncHandler = require("express-async-handler"); // @route POST /users
// @desc Search for users
// @access Private

exports.searchUsers = asyncHandler(function _callee(req, res, next) {
  var searchString, users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          searchString = req.query.search;

          if (!searchString) {
            _context.next = 5;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(
            User.find({
              username: {
                $regex: searchString,
                $options: "i",
              },
            })
          );

        case 4:
          users = _context.sent;

        case 5:
          if (users) {
            _context.next = 8;
            break;
          }

          res.status(404);
          throw new Error("No users found in search");

        case 8:
          res.status(200).json({
            users: users,
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
});
