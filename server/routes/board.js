const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  validateRemoveBoardParams,
  validateAddBoardParams,
} = require("../middleware/validateRouteParams");
const {
  createDefaultBoard,
  addBoard,
  removeBoard,
} = require("../controllers/board");

router.route("/create/default-board").post(protect, createDefaultBoard);
router
  .route("/create/:boardTitle")
  .post(protect, validateAddBoardParams, addBoard);
router
  .route("/remove/:boardId")
  .delete(protect, validateRemoveBoardParams, removeBoard);
module.exports = router;
