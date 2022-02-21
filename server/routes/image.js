const upload = require('../config/multerConfig')
const { uploadImage } = require('../controllers/image')
const router = require('express').Router()
const protect = require('../middleware/auth')

router.post('/upload', protect, upload.imageUpload.any(), uploadImage)

module.exports = router
