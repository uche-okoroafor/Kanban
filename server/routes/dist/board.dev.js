"use strict";

var express = require("express");

var router = express.Router();

var protect = require("../middleware/auth");

var _require = require("../middleware/validateRouteParams"),
  validateRemoveBoardParams = _require.validateRemoveBoardParams,
  validateAddBoardParams = _require.validateAddBoardParams,
  validateUserIdParams = _require.validateUserIdParams;

var _require2 = require("../controllers/board"),
  createDefaultBoard = _require2.createDefaultBoard,
  addBoard = _require2.addBoard,
  removeBoard = _require2.removeBoard;

router
  .route("/create/default-board/:userId")
  .post(protect, validateUserIdParams, createDefaultBoard);
router
  .route("/create/:boardTitle/:userId")
  .post(protect, validateAddBoardParams, addBoard);
router
  .route("/remove/:boardId/:userId")
  ["delete"](protect, validateRemoveBoardParams, removeBoard);
module.exports = router;
