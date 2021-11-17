const express = require("express");
const router = express.Router();
const {
  validateCreateColumnParams,
  validateUpdateColumnParams,
  validateColumnParams,
  validateMoveCardInParams,
  validateMoveCardOutParams,
} = require("../middleware/validateRouteParams");

const protect = require("../middleware/auth");
const {
  createColumn,
  updateColumn,
  removeColumn,
  moveCardWithinColumn,
  moveCardOutsideColumn,
  moveColumn,
} = require("../controllers/column");

router
  .route("/create-column/:columnTitle/:boardId")
  .post(protect, validateCreateColumnParams, createColumn);
router
  .route("/update-column")
  .patch(protect, validateUpdateColumnParams, updateColumn);
router
  .route("/remove-column/columns/:columnId/boards/:boardId")
  .delete(protect, validateColumnParams, removeColumn);
router.route("/move-column").post(protect, validateColumnParams, moveColumn);
router
  .route("/move-card-within-column")
  .post(protect, validateMoveCardInParams, moveCardWithinColumn);
router
  .route("/move-card-outside-column")
  .post(protect, validateMoveCardOutParams, moveCardOutsideColumn);

module.exports = router;
