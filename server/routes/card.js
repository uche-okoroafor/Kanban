const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const { createCard } = require('../controllers/card')

const {
  moveCardWithinColumn,
  moveCardOutsideColumn
} = require('../controllers/moveCard')

router.route('/create-card').post(protect, createCard)
router.route('/move/within-column').post(protect, moveCardWithinColumn)
router.route('/move/outside-column').post(protect, moveCardOutsideColumn)

module.exports = router
