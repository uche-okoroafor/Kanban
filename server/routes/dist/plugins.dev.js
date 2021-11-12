"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/plugins"),
  getPlugin = _require.getPlugin,
  createPlugin = _require.createPlugin,
  updatePlugin = _require.updatePlugin,
  deletePlugin = _require.deletePlugin,
  getAllPlugins = _require.getAllPlugins,
  activate = _require.activate,
  destroy = _require.destroy;

var _require2 = require("../middleware/verifyPlugin"),
  verifyPlugin = _require2.verifyPlugin;

router.route("/:cardId").get(getAllPlugins);
router.route("/:pluginName/activate").post(activate);
router.route("/:pluginName/destroy")["delete"](destroy);
router
  .route("/:pluginId")
  .get(verifyPlugin, getPlugin)
  .post(createPlugin)
  .patch(verifyPlugin, updatePlugin)
  ["delete"](verifyPlugin, deletePlugin);
module.exports = router;
