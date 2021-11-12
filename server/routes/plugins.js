const express = require("express");
const router = express.Router();
const {
  getPlugin,
  createPlugin,
  updatePlugin,
  deletePlugin,
  getAllPlugins,
  activate,
  destroy,
} = require("../controllers/plugins");
const { verifyPlugin } = require("../middleware/verifyPlugin");

router.route("/:cardId").get(getAllPlugins);
router.route("/:pluginName/activate").post(activate);
router.route("/:pluginName/destroy").delete(destroy);

router
  .route("/:pluginId")
  .get(verifyPlugin, getPlugin)
  .post(createPlugin)
  .patch(verifyPlugin, updatePlugin)
  .delete(verifyPlugin, deletePlugin);

module.exports = router;
