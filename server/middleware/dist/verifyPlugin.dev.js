"use strict";

var asyncHandler = require("express-async-handler");

var BasePlugin = require("../models/BasePlugin");
/**
 * Middleware for verifying a plugin.
 * @function
 */

exports.verifyPlugin = asyncHandler(function _callee(req, res, next) {
  var pluginId, plugin;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          pluginId = req.params.pluginId;
          _context.next = 3;
          return regeneratorRuntime.awrap(BasePlugin.findById(pluginId));

        case 3:
          plugin = _context.sent;

          if (!plugin) {
            res.status(400).json({
              message: "Plugin does not exist.",
            });
          }

          req.plugin = plugin;
          next();

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
