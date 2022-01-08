const asyncHandler = require('express-async-handler')
const Card = require('./../models/Card')
const BasePlugin = require('../models/BasePlugin')

exports.activate = asyncHandler(async (req, res) => {
  const { pluginName } = req.params
  const response = await BasePlugin.attach(Card, pluginName)

  if (response.status === 400) {
    res.status(response.status).json(response.data)
  }

  res.status(200).json({ response })
})

/**
 * Removes a plugin from a card and destroys it.
 * @function
 */
exports.destroy = asyncHandler(async (req, res) => {
  const { pluginId } = req.params
  const plugin = await BasePlugin.detach(Card, pluginId)

  if (!plugin) {
    res.status(400).json({ message: 'Plugin does not exist.' })
  }

  const deletedPlugin = await BasePlugin.findByIdAndDelete(pluginId)
  res.status(200).json({ plugin: deletedPlugin })
})

/**
 * Retrieves all the plugins in a particular card.
 * @function
 */
exports.getAllPlugins = asyncHandler(async (req, res) => {
  const { cardId } = req.params

  const card = await BasePlugin.find({ resourceId: cardId })

  if (!card) {
    res.status(400).json({ message: 'Card does not exist.' })
  }

  res.status(200).json({ plugins: card })
})

/**
 * Retrieves a plugin.
 * @function
 */
exports.getPlugin = asyncHandler(async (req, res) => {
  const response = await req.plugin.get()
  if (response.status === 200) {
    res.status(response.status).json(response.data)
  } else {
    res.status(response.status).json(response.data)
  }
})

/**
 * Creates a new plugin.
 * @function
 */
exports.createPlugin = asyncHandler(async (req, res) => {
  const data = req.body
  const response = await req.plugin.create(data)
  if (response.status === 200) {
    res.status(response.status).json(response.data)
  } else {
    res.status(response.status).json(response.data)
  }
})

/**
 * Updates a plugin.
 * @function
 */
exports.updatePlugin = asyncHandler(async (req, res) => {
  const data = req.body
  const response = await req.plugin.update(data)
  if (response.status === 200) {
    res.status(response.status).json(response.data)
  } else {
    res.status(response.status).json(response.data)
  }
})

/**
 * Deletes a plugin.
 * @function
 */
exports.deletePlugin = asyncHandler(async (req, res) => {
  const response = await req.plugin.delete()
  if (response.status === 200) {
    res.status(response.status).json(response.data)
  } else {
    res.status(response.status).json(response.data)
  }
})
