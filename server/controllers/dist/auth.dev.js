"use strict";

var User = require("../models/User");

var asyncHandler = require("express-async-handler");

var generateToken = require("../utils/generateToken"); // @route POST /auth/register
// @desc Register user
// @access Public

exports.registerUser = asyncHandler(function _callee(req, res, next) {
  var _req$body,
    username,
    email,
    password,
    emailExists,
    usernameExists,
    user,
    token,
    secondsInWeek;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          (_req$body = req.body),
            (username = _req$body.username),
            (email = _req$body.email),
            (password = _req$body.password);
          _context.next = 3;
          return regeneratorRuntime.awrap(
            User.findOne({
              email: email,
            })
          );

        case 3:
          emailExists = _context.sent;

          if (!emailExists) {
            _context.next = 7;
            break;
          }

          res.status(400);
          throw new Error("A user with that email already exists");

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(
            User.findOne({
              username: username,
            })
          );

        case 9:
          usernameExists = _context.sent;

          if (!usernameExists) {
            _context.next = 13;
            break;
          }

          res.status(400);
          throw new Error("A user with that username already exists");

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(
            User.create({
              username: username,
              email: email,
              password: password,
            })
          );

        case 15:
          user = _context.sent;

          if (!user) {
            _context.next = 23;
            break;
          }

          token = generateToken(user._id);
          secondsInWeek = 604800;
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: secondsInWeek * 1000,
          });
          res.status(201).json({
            success: {
              user: {
                id: user._id,
                username: user.username,
                email: user.email,
              },
            },
          });
          _context.next = 25;
          break;

        case 23:
          res.status(400);
          throw new Error("Invalid user data");

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @route POST /auth/login
// @desc Login user
// @access Public

exports.loginUser = asyncHandler(function _callee2(req, res, next) {
  var _req$body2, email, password, user, token, secondsInWeek;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          (_req$body2 = req.body),
            (email = _req$body2.email),
            (password = _req$body2.password);
          _context2.next = 3;
          return regeneratorRuntime.awrap(
            User.findOne({
              email: email,
            })
          );

        case 3:
          user = _context2.sent;
          _context2.t0 = user;

          if (!_context2.t0) {
            _context2.next = 9;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(user.matchPassword(password));

        case 8:
          _context2.t0 = _context2.sent;

        case 9:
          if (!_context2.t0) {
            _context2.next = 16;
            break;
          }

          token = generateToken(user._id);
          secondsInWeek = 604800;
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: secondsInWeek * 1000,
          });
          res.status(200).json({
            success: {
              user: {
                id: user._id,
                username: user.username,
                email: user.email,
              },
            },
          });
          _context2.next = 18;
          break;

        case 16:
          res.status(401);
          throw new Error("Invalid email or password");

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @route GET /auth/user
// @desc Get user data with valid token
// @access Private

exports.loadUser = asyncHandler(function _callee3(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch ((_context3.prev = _context3.next)) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 2:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          res.status(401);
          throw new Error("Not authorized");

        case 6:
          res.status(200).json({
            success: {
              user: {
                id: user._id,
                username: user.username,
                email: user.email,
              },
            },
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // @route GET /auth/logout
// @desc Logout user
// @access Public

exports.logoutUser = asyncHandler(function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch ((_context4.prev = _context4.next)) {
        case 0:
          res.clearCookie("token");
          res.send("You have successfully logged out");

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
});
