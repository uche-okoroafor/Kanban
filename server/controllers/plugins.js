const asyncHandler = require("express-async-handler");

/**
 * Activates a plugin in a resource.
 * @function
 */
exports.activate = asyncHandler(async (req, res) => {
  const { pluginName, cardId } = req.params;
});

/**
 * Removes a plugin from a resource.
 * @function
 */
exports.destroy = asyncHandler(async (req, res) => {});

/**
 * Middleware to verify plugin.
 * @function
 */
// ADD MIDDLEWARE VALIDATION TO ENSURE PLUGINID PARAM EXISTS!
exports.verifyPlugin = asyncHandler(async (req, res) => {});

// TODO: Figure out a generalized response structure for all plugins to follow.
// Passing status codes on responses, plugin handler will deal with the status codes
// accordingly. 400 Bad Request, the plugin handler will respond with a generic response.

exports.getPlugin = asyncHandler(async (req, res) => {
  // We have access to the req.plugin
  const response = await req.plugin.get();
  if (response.status === 200) {
    return res.json(response.data);
  } else {
    response.status === 400;
    return res.json({ message: "Plugin not available" });
  }
});

exports.postPlugin = asyncHandler(async (req, res) => {
  const response = awa;
});
