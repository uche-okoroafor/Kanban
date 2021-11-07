"use strict";

var mongoose = require("mongoose");

var bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.matchPassword = function _callee(enteredPassword) {
  return regeneratorRuntime.async(
    function _callee$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(
              bcrypt.compare(enteredPassword, this.password)
            );

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    },
    null,
    this
  );
};

userSchema.pre("save", function _callee2(next) {
  var salt;
  return regeneratorRuntime.async(
    function _callee2$(_context2) {
      while (1) {
        switch ((_context2.prev = _context2.next)) {
          case 0:
            if (!this.isModified("password")) {
              next();
            }

            _context2.next = 3;
            return regeneratorRuntime.awrap(bcrypt.genSalt(10));

          case 3:
            salt = _context2.sent;
            _context2.next = 6;
            return regeneratorRuntime.awrap(bcrypt.hash(this.password, salt));

          case 6:
            this.password = _context2.sent;

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    },
    null,
    this
  );
});
module.exports = User = mongoose.model("user", userSchema);
