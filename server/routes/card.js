const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const {
  createCard,
  updateCardItems,
  removeCardItems
} = require('../controllers/card')

router.route('/create-card').post(protect, createCard)
router.route('/add-card/item').post(protect, updateCardItems)
router.route('/update-card/item').post(protect, removeCardItems)

module.exports = router
