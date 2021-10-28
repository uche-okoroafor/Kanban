const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const {
  createColumn,
  updateColumn,
  removeColumn
} = require('../controllers/column')
const { moveColumn } = require('../controllers/moveColumn')

router.route('/create-column').post(protect, createColumn)
router.route('/update-column').post(protect, updateColumn)
router.route('/remove-column').post(protect, removeColumn)
router.route('/move-column').post(protect, moveColumn)

module.exports = router
