const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/auth");
const { searchUsers, uploadImage } = require("../controllers/user");

const storage = multer.diskStorage({});

const upload = multer({
  storage,
});

router.route("/").get(protect, searchUsers);

router.route("/upload").put(protect, upload.single("image"), uploadImage);

module.exports = router;
