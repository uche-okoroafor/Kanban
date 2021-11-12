"use strict";

var asyncHandler = require("express-async-handler");

var Card = require("./../models/Card");

var BasePlugin = require("../models/BasePlugin");

exports.activate = asyncHandler(function _callee(req, res) {
  var pluginName, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          pluginName = req.params.pluginName;
          _context.next = 3;
          return regeneratorRuntime.awrap(BasePlugin.attach(Card, pluginName));

        case 3:
          response = _context.sent;

          if (response.status === 400) {
            res.status(400).json({
              message: response.message,
            });
          }

          res.status(200).json({
            response: response,
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
/**
 * Removes a plugin from a card and destroys it.
 * @function
 */

exports.destroy = asyncHandler(function _callee2(req, res) {
  var pluginId, plugin, deletedPlugin;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          pluginId = req.params.pluginId;
          _context2.next = 3;
          return regeneratorRuntime.awrap(BasePlugin.detach(Card, pluginId));

        case 3:
          plugin = _context2.sent;

          if (!plugin) {
            res.status(400).json({
              message: "Plugin does not exist.",
            });
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(
            BasePlugin.findByIdAndDelete(pluginId)
          );

        case 7:
          deletedPlugin = _context2.sent;
          res.status(200).json({
            plugin: deletedPlugin,
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
/**
 * Retrieves all the plugins in a particular card.
 * @function
 */

exports.getAllPlugins = asyncHandler(function _callee3(req, res) {
  var cardId, card;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch ((_context3.prev = _context3.next)) {
        case 0:
          cardId = req.params.cardId;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Card.findById(cardId));

        case 3:
          card = _context3.sent;

          if (!card) {
            res.status(400).json({
              message: "Card does not exist.",
            });
          }

          res.status(200).json({
            plugins: card.plugins,
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
/**
 * Retrieves a plugin.
 * @function
 */

exports.getPlugin = asyncHandler(function _callee4(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch ((_context4.prev = _context4.next)) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(req.plugin.get());

        case 2:
          response = _context4.sent;

          if (response.status === 200) {
            res.status(200).json(response.data);
          } else {
            res.status(400).json({
              message: "Plugin not available",
            });
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
/**
 * Creates a new plugin.
 * @function
 */

exports.createPlugin = asyncHandler(function _callee5(req, res) {
  var data, response;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch ((_context5.prev = _context5.next)) {
        case 0:
          data = req.body;
          _context5.next = 3;
          return regeneratorRuntime.awrap(req.plugin.create(data));

        case 3:
          response = _context5.sent;

          if (response.status === 200) {
            res.status(200).json(response.data);
          } else {
            res.status(400).json({
              message: "Error creating plugin",
            });
          }

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
/**
 * Updates a plugin.
 * @function
 */

exports.updatePlugin = asyncHandler(function _callee6(req, res) {
  var data, response;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch ((_context6.prev = _context6.next)) {
        case 0:
          data = req.body;
          _context6.next = 3;
          return regeneratorRuntime.awrap(req.plugin.update(data));

        case 3:
          response = _context6.sent;

          if (response.status === 200) {
            res.status(200).json(response.data);
          } else {
            res.status(400).json({
              message: "Error updating plugin",
            });
          }

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
/**
 * Deletes a plugin.
 * @function
 */

exports.deletePlugin = asyncHandler(function _callee7(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch ((_context7.prev = _context7.next)) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(req.plugin["delete"]());

        case 2:
          response = _context7.sent;

          if (response.status === 200) {
            res.status(200).json(response.data);
          } else {
            res.status(400).json({
              message: "Error updating plugin",
            });
          }

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
