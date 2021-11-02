const upload = require("../config/multerConfig");
const { uploadImage } = require("../controllers/image");
const { validateUserIdParams } = require("../middleware/validateRouteParams");
const router = require("express").Router();

router.post(
  "/upload",
  validateUserIdParams,
  upload.imageUpload.any(),
  uploadImage
);

module.exports = router;
