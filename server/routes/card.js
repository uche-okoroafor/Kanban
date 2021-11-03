const router = require("express").Router();
const upload = require("../config/multerConfig");
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
  addAttachment,
} = require("../controllers/card");

router
  .route("/create-card")
  .post(protect, validateCreateCardParams, createCard);
router
  .route("/update-card/item")
  .post(protect, validateUpdateCardItemsParams, updateCardItems);
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

router.route("/attachment").post(upload.imageUpload.any(), addAttachment);

module.exports = router;
