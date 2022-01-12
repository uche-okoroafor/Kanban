const router = require('express').Router()
const {
  validateCreateCardParams,
  validateUpdateCardItemsParams,
  validateRemoveCardItemsParams,
  validateDeleteCard
} = require('../middleware/validateRouteParams')

const protect = require('../middleware/auth')
const {
  createCard,
  updateCardItems,
  removeCardItems,
  deleteCard
} = require('../controllers/card')

router.route('/create-card').post(protect, validateCreateCardParams, createCard)

router
  .route('/update-card/item')
  .post(protect, validateUpdateCardItemsParams, updateCardItems)

router
  .route('/remove-card/item')
  .post(protect, validateRemoveCardItemsParams, removeCardItems)
router.route('/delete-card').delete(protect, validateDeleteCard, deleteCard)
module.exports = router
