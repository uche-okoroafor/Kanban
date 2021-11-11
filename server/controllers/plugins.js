const asyncHandler = require("express-async-handler");
const Card = require("./../models/Card");
const BasePlugin = require("../models/BasePlugin");

/**
 * Activates a plugin in a card.
 * @function
 */
exports.activate = asyncHandler(async (req, res) => {
  // get parameters from the request.
  const { pluginName } = req.params;
  const response = await BasePlugin.attach(Card, pluginName);

  if (response.status === 400) {
    res.sendStatus(400);
    res.json({ message: response.message });
  }

  res.sendStatus(200);
  res.json({ response });
});

/**
 * Removes a plugin from a card and destroys it.
 * @function
 */
exports.destroy = asyncHandler(async (req, res) => {
  const { pluginId } = req.params;
  const plugin = await BasePlugin.detach(Card, pluginId);

  if (!plugin) {
    res.sendStatus(400);
    res.json({ message: "Plugin does not exist." });
  }

  const deletedPlugin = await BasePlugin.findByIdAndDelete(pluginId);
  res.sendStatus(200);
  res.json({ plugin: deletedPlugin });
});

exports.getAllPlugins = asyncHandler(async (req, res) => {
  const { cardId } = req.params;
  const card = await Card.findById(cardId);

  if (!card) {
    res.sendStatus(400);
    res.json({ message: "Card does not exist." });
  }

  res.sendStatus(200);
  res.json({ plugins: card.plugins });
});

/**
 * Retrieves a plugin.
 * @function
 */
exports.getPlugin = asyncHandler(async (req, res) => {
  // We have access to the req.plugin
  const response = await req.plugin.get();
  if (response.status === 200) {
    res.json(response.data);
  } else {
    res.sendStatus(400);
    res.json({ message: "Plugin not available" });
  }
});

/**
 * Creates a new plugin.
 * @function
 */
exports.createPlugin = asyncHandler(async (req, res) => {
  const data = req.body;
  const response = await req.plugin.create(data);
  if (response.status === 200) {
    res.json(response.data);
  } else {
    res.sendStatus(400);
    res.json({ message: "Error creating plugin" });
  }
});

/**
 * Updates a plugin.
 * @function
 */
exports.updatePlugin = asyncHandler(async (req, res) => {
  const data = req.body;
  const response = await req.plugin.update(data);
  if (response.status === 200) {
    res.json(response.data);
  } else {
    res.sendStatus(400);
    res.json({ message: "Error updating plugin" });
  }
});

/**
 * Deletes a plugin.
 * @function
 */
exports.deletePlugin = asyncHandler(async (req, res) => {
  const response = await req.plugin.delete();
  if (response.status === 200) {
    res.json(response.data);
  } else {
    res.sendStatus(400);
    res.json({ message: "Error updating plugin" });
  }
});
