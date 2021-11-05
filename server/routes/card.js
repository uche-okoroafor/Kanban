const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createCard } = require("../controllers/card");
const {
  validateCreateCardParams,
} = require("../middleware/validateRouteParams");

router
  .route("/create-card/:boardId/:columnId/:userId/:cardTitle/:tagColor")
  .post(protect, validateCreateCardParams, createCard);

module.exports = router;
