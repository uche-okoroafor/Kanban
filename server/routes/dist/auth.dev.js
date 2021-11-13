"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../validate"),
  validateRegister = _require.validateRegister,
  validateLogin = _require.validateLogin;

var protect = require("../middleware/auth");

var _require2 = require("../controllers/auth"),
  registerUser = _require2.registerUser,
  loginUser = _require2.loginUser,
  loadUser = _require2.loadUser,
  logoutUser = _require2.logoutUser,
  demoLogin = _require2.demoLogin;

router.route("/register").post(validateRegister, registerUser);
router.route("/demo-login").get(demoLogin);
router.route("/login").post(validateLogin, loginUser);
router.route("/user").get(protect, loadUser);
router.route("/logout").get(logoutUser);
module.exports = router;
