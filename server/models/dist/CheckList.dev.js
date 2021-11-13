"use strict";

var _this = void 0;

var mongoose = require("mongoose");

var BasePlugin = require("./BasePlugin");

var checklistItemSchema = new mongoose.Schema({
  checklistItem: {
    type: String,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});
var ChecklistPluginSchema = BasePlugin.discriminator(
  "ChecklistPlugin",
  new mongoose.Schema(
    {
      checklist: [checklistItemSchema],
    },
    {
      timestamps: true,
    }
  )
);

ChecklistPluginSchema.methods.get = function _callee(_ref) {
  var params, checklistItemId, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          params = _ref.params;
          checklistItemId = params.checklistItemId;

          if (checklistItemId) {
            _context.next = 4;
            break;
          }

          throw new Error("checklistItemId is not defined");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(
            _this.model("ChecklistPlugin").findById(checklistItemId)
          );

        case 6:
          data = _context.sent;

          if (!data) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", {
            status: 200,
            data: data,
          });

        case 9:
          return _context.abrupt("return", {
            response: 500,
            message: message,
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

ChecklistPluginSchema.methods.create = function _callee2(_ref2) {
  var body, checklistItem, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          body = _ref2.body;
          checklistItem = body.checklistItem;

          if (checklistItem) {
            _context2.next = 4;
            break;
          }

          throw new Error("checklistItem is not defined");

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(
            mongoose.model("ChecklistPlugin").create({
              checklistItem: checklistItem,
              isChecked: false,
            })
          );

        case 6:
          data = _context2.sent;

          if (!data) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", {
            status: 200,
            data: data,
          });

        case 9:
          return _context2.abrupt("return", {
            response: 500,
            message: message,
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
};

ChecklistPluginSchema.methods.update = function _callee3(_ref3) {
  var body, checklistItem, checklistItemId, isChecked, data;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch ((_context3.prev = _context3.next)) {
        case 0:
          body = _ref3.body;
          (checklistItem = body.checklistItem),
            (checklistItemId = body.checklistItemId),
            (isChecked = body.isChecked);

          if (!(!checklistItemId || !isChecked || !checklistItem)) {
            _context3.next = 4;
            break;
          }

          throw new Error("required params is not defined");

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(
            mongoose.model("ChecklistPlugin").findByIdAndUpdate(
              {
                _id: checklistItemId,
              },
              {
                $set: {
                  checklistItem: checklistItem,
                  isChecked: isChecked,
                },
              }
            )
          );

        case 6:
          data = _context3.sent;

          if (!data) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", {
            status: 200,
            data: data,
          });

        case 9:
          return _context3.abrupt("return", {
            response: 500,
            message: message,
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
};

ChecklistPluginSchema.methods.patch = function _callee4(_ref4) {
  var body, checklistItemId, isChecked, data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch ((_context4.prev = _context4.next)) {
        case 0:
          body = _ref4.body;
          (checklistItemId = body.checklistItemId),
            (isChecked = body.isChecked);

          if (!(!checklistItemId || !isChecked)) {
            _context4.next = 4;
            break;
          }

          throw new Error("required params is not defined");

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(
            mongoose.model("ChecklistPlugin").findByIdAndUpdate(
              {
                _id: checklistItemId,
              },
              {
                $set: {
                  isChecked: isChecked,
                },
              }
            )
          );

        case 6:
          data = _context4.sent;

          if (!data) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", {
            status: 200,
            data: data,
          });

        case 9:
          return _context4.abrupt("return", {
            response: 500,
            message: message,
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
};

ChecklistPluginSchema.methods["delete"] = function _callee5(_ref5) {
  var body, checklistItemId, data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch ((_context5.prev = _context5.next)) {
        case 0:
          body = _ref5.body;
          checklistItemId = body.checklistItemId;

          if (checklistItemId) {
            _context5.next = 4;
            break;
          }

          throw new Error("checklistItemId is not defined");

        case 4:
          _context5.next = 6;
          return regeneratorRuntime.awrap(
            mongoose.model("ChecklistPlugin").findByIdAndUpdate(
              {
                _id: checklistItemId,
              },
              {
                $pull: {
                  isChecked: isChecked,
                },
              }
            )
          );

        case 6:
          data = _context5.sent;

          if (!data) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt("return", {
            status: 200,
            data: data,
          });

        case 9:
          return _context5.abrupt("return", {
            response: 500,
            message: message,
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
};
