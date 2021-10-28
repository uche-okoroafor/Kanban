const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const {
  createCard,
  updateCardItems,
  removeCardItems
} = require('../controllers/card')

const {
  createChecklist,
  updateChecklist,
  removeChecklist
} = require('../controllers/checklist')

router.route('/create-card').post(protect, createCard)
router.route('/add-card/item').post(protect, updateCardItems)
router.route('/update-card/item').post(protect, removeCardItems)
router.route('/create/checklist').post(protect, createChecklist)
router.route('/update/checklist').post(protect, updateChecklist)
router.route('/remove/checklist').post(protect, removeChecklist)

module.exports = router
