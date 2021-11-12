"use strict";

var _this = void 0;

var _require = require("mongoose"),
  Schema = _require.Schema,
  model = _require.model,
  Model = _require.Model;

var BasePluginSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "plugins",
    discriminatorKey: "type",
  }
);
/**
 * Attaches a plugin to the card.
 * @method
 * @param {typeof Model} Model
 * @param {string} pluginName
 * @returns
 */

BasePluginSchema.methods.attach = function _callee(Model, pluginName) {
  var cardId, plugin;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          cardId = _this.resourceId;
          plugin = _this.model.find({
            name: pluginName,
          });

          if (plugin) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", {
            status: 400,
            message: "Plugin does not exist.",
          });

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(
            Model.findByIdAndUpdate(cardId, {
              $push: {
                plugins: plugin._id,
              },
            })
          );

        case 6:
          return _context.abrupt("return", _context.sent);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};
/**
 * Dettaches a plugin from the card.
 * @method
 * @param {typeof Model} Model
 * @param {string} pluginId
 * @returns
 */

BasePluginSchema.methods.detach = function _callee2(Model, pluginId) {
  var cardId;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          cardId = _this.resourceId;
          _context2.next = 3;
          return regeneratorRuntime.awrap(
            Model.findByIdAndUpdate(cardId, {
              $pull: {
                plugins: pluginId,
              },
            })
          );

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var BasePlugin = model("BasePlugin", BasePluginSchema);
module.exports = BasePlugin;
