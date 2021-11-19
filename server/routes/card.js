const router = require("express").Router();
const {
  validateCreateCardParams,
  validateUpdateCardItemsParams,
  validateRemoveCardItemsParams,
} = require("../middleware/validateRouteParams");

const protect = require("../middleware/auth");
const {
  createCard,
  updateCardItems,
  removeCardItems,
} = require("../controllers/card");

router
  .route("/create-card/:boardId/:columnId/:cardTitle/:tagColor")
  .post(protect, validateCreateCardParams, createCard);

router
  .route("/update-card/item")
  .post(protect, validateUpdateCardItemsParams, updateCardItems);

router
  .route("/remove-card/item")
  .post(protect, validateRemoveCardItemsParams, removeCardItems);

module.exports = router;
