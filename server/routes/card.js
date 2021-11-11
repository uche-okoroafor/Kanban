const router = require("express").Router();
const upload = require("../config/multerConfig");
const {
  validateCreateCardParams,
  validateUpdateCardItemsParams,
  validateRemoveCardItemsParams,
} = require("../middleware/vaildateRouteParams");

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
