const asyncHandler = require("express-async-handler");
const BasePlugin = require("../models/BasePlugin");

/**
 * Middleware for verifying a plugin.
 * @function
 */
exports.verifyPlugin = asyncHandler(async (req, res, next) => {
  const { pluginId } = req.params;
  const plugin = await BasePlugin.findById(pluginId);

  if (!plugin) {
    res.status(400).json({ message: "Plugin does not exist." });
  }

  req.plugin = plugin;
  next();
});
