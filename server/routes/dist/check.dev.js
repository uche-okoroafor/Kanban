"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/check"),
  check = _require.check;

router.route("/").post(check);
module.exports = router;
