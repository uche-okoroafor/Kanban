const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const {
  validateRemoveBoardParams,
  validateAddBoardParams
} = require('../middleware/validateRouteParams')
const {
  createDefaultBoard,
  addBoard,
  removeBoard,
  getUserBoard,
  updateActiveBoard
} = require('../controllers/board')

router.route('/user').get(protect, getUserBoard)
router.route('/create/default-board').get(protect, createDefaultBoard)
router.route('/update-active-board').post(protect, updateActiveBoard)
router
  .route('/create/:boardTitle')
  .post(protect, validateAddBoardParams, addBoard)
router
  .route('/remove/:boardId')
  .delete(protect, validateRemoveBoardParams, removeBoard)
module.exports = router
