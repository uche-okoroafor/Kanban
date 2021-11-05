const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  validateRemoveBoardParams,
  validateAddBoardParams,
  validateUserIdParams,
} = require("../middleware/validateRouteParams");
const {
  createDefaultBoard,
  addBoard,
  removeBoard,
} = require("../controllers/board");

router
  .route("/create/default-board/:userId")
  .post(protect, validateUserIdParams, createDefaultBoard);
router
  .route("/create/:boardTitle/:userId")
  .post(protect, validateAddBoardParams, addBoard);
router
  .route("/remove/:boardId/:userId")
  .delete(protect, validateRemoveBoardParams, removeBoard);
module.exports = router;
