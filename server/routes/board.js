const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const { createBoard, removeBoard } = require('../controllers/board')

router.route('/create').post(protect, createBoard)
router.route('/remove').post(protect, removeBoard)

module.exports = router
