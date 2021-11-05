"use strict";

var router = require("express").Router();

var upload = require("../config/multerConfig");

var _require = require("../middleware/vaildateRouteParams"),
  validateCreateCardParams = _require.validateCreateCardParams,
  validateUpdateCardItemsParams = _require.validateUpdateCardItemsParams,
  validateRemoveCardItemsParams = _require.validateRemoveCardItemsParams,
  validateCreateChecklistParams = _require.validateCreateChecklistParams,
  validateUpdateChecklistParams = _require.validateUpdateChecklistParams,
  validateRemoveChecklistParams = _require.validateRemoveChecklistParams;

var protect = require("../middleware/auth");

var _require2 = require("../controllers/card"),
  createCard = _require2.createCard,
  updateCardItems = _require2.updateCardItems,
  removeCardItems = _require2.removeCardItems,
  createChecklist = _require2.createChecklist,
  updateChecklist = _require2.updateChecklist,
  removeChecklist = _require2.removeChecklist;

router
  .route("/create-card/:boardId/:columnId/:userId/:cardTitle/:tagColor")
  .post(protect, validateCreateCardParams, createCard);
router
  .route("/update-card/item")
  .post(
    protect,
    validateUpdateCardItemsParams,
    upload.imageUpload.any(),
    updateCardItems
  );
router
  .route("/remove-card/item")
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
