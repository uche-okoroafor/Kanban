const upload = require("../config/multerConfig");
const { uploadImage } = require("../controllers/image");
const { validateUserId } = require("../middleware/validateRouteParams");
const router = require("express").Router();

router.post("/upload", validateUserId, upload.imageUpload.any(), uploadImage);

module.exports = router;
