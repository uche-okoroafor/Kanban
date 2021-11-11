const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require("../validate");
const protect = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  loadUser,
  logoutUser,
  demoLogin,
} = require("../controllers/auth");




router.route("/demo-login").get(demoLogin);

router.route("/login").post(validateLogin, loginUser);



router.route("/user").get(protect, loadUser);

router.route("/logout").get(logoutUser);

module.exports = router;
