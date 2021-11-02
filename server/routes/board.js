const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  validateRemoveBoard,
  validateUserIdParams,
} = require("../middleware/validateRouteParams");
const {
  createDefaultBoard,
  addBoard,
  removeBoard,
} = require("../controllers/board");

router.route("/create/default-board").post(
  // protect,
  validateUserIdParams,
  createDefaultBoard
);
router.route("/create").post(protect, validateUserIdParams, addBoard);
router
  .route("/remove/:boardId/:userId")
  .delete(validateRemoveBoard, protect, removeBoard);
module.exports = router;
