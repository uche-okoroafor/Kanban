const upload = require("../config/multerConfig");
const { uploadImage } = require("../controllers/image");
const router = require("express").Router();

router.post("/upload", upload.imageUpload.any(), uploadImage);

module.exports = router;
