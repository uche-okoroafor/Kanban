"use strict";

var express = require("express");

var router = express.Router();

var protect = require("../middleware/auth");

var _require = require("../controllers/card"),
  createCard = _require.createCard;

var _require2 = require("../middleware/validateRouteParams"),
  validateCreateCardParams = _require2.validateCreateCardParams;

router
  .route("/create-card/:boardId/:columnId/:userId/:cardTitle/:tagColor")
  .post(protect, validateCreateCardParams, createCard);
module.exports = router;
