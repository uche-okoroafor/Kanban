const express = require("express");
const router = express.Router();
const {
  validateCreateCardParams,
  validateUpdateCardItemsParams,
  validateRemoveCardItemsParams,
  validateCreateChecklistParams,
  validateUpdateChecklistParams,
  validateRemoveChecklistParams,
} = require("../middleware/vaildateRouteParams");

const protect = require("../middleware/auth");
const {
  createCard,
  updateCardItems,
  removeCardItems,
  createChecklist,
  updateChecklist,
  removeChecklist,
} = require("../controllers/card");

router
  .route("/create-card")
  .post(protect, validateCreateCardParams, createCard);
router
  .route("/add-card/item")
  .post(protect, validateUpdateCardItemsParams, updateCardItems);
router
  .route("/update-card/item")
  .post(protect, validateRemoveCardItemsParams, removeCardItems);
router
  .route("/create/checklist")
  .post(protect, validateCreateChecklistParams, createChecklist);
router
  .route("/update/checklist")
  .post(protect, validateUpdateChecklistParams, updateChecklist);
router
  .route("/remove/checklist")
  .post(protect, validateRemoveChecklistParams, removeChecklist);

module.exports = router;
