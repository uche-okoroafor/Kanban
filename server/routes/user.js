const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers, getUser } = require("../controllers/user");

router.route("/:id").get(protect, getUser);
router.route("/").get(protect, searchUsers);

module.exports = router;
