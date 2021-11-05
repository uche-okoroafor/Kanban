"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../middleware/validateRouteParams"),
  validateCreateColumnParams = _require.validateCreateColumnParams,
  validateUpdateColumnParams = _require.validateUpdateColumnParams,
  validateColumnParams = _require.validateColumnParams,
  validateMoveCardInParams = _require.validateMoveCardInParams,
  validateMoveCardOutParams = _require.validateMoveCardOutParams;

var protect = require("../middleware/auth");

var _require2 = require("../controllers/column"),
  createColumn = _require2.createColumn,
  updateColumn = _require2.updateColumn,
  removeColumn = _require2.removeColumn,
  moveCardWithinColumn = _require2.moveCardWithinColumn,
  moveCardOutsideColumn = _require2.moveCardOutsideColumn,
  moveColumn = _require2.moveColumn;

router
  .route("/create-column/:columnTitle/:boardId/:userId")
  .post(protect, validateCreateColumnParams, createColumn);
router
  .route("/update-column")
  .patch(protect, validateUpdateColumnParams, updateColumn);
router
  .route("/remove-column/columns/:columnId/boards/:boardId/:userId")
  ["delete"](protect, validateColumnParams, removeColumn);
router.route("/move-column").post(protect, validateColumnParams, moveColumn);
router
  .route("/move-card-within-column")
  .post(protect, validateMoveCardInParams, moveCardWithinColumn);
router
  .route("/movd-card-outside-column")
  .post(protect, validateMoveCardOutParams, moveCardOutsideColumn);
module.exports = router;
