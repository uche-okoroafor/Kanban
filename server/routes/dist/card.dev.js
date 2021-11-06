"use strict";

var router = require("express").Router();

var upload = require("../config/multerConfig");

var _require = require("../middleware/vaildateRouteParams"),
  validateCreateCardParams = _require.validateCreateCardParams,
  validateUpdateCardItemsParams = _require.validateUpdateCardItemsParams,
  validateRemoveCardItemsParams = _require.validateRemoveCardItemsParams;

var protect = require("../middleware/auth");

var _require2 = require("../controllers/card"),
  createCard = _require2.createCard,
  updateCardItems = _require2.updateCardItems,
  removeCardItems = _require2.removeCardItems;

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
module.exports = router;
