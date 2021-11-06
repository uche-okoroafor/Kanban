"use strict";

var _require = require("express-validator"),
  check = _require.check,
  validationResult = _require.validationResult;

var handleParams = function handleParams(params) {
  return check(params, " ".concat(params, " is not defined")).not().isEmpty();
};

var handleError = function handleError(req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      errors: errors.array(),
    });
  next();
};

exports.validateCreateCardParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("cardTitle"),
  handleParams("tagColor"),
  handleParams("columnId"),
  function (req, res, next) {
    handleError(req, res, next);
  },
];
exports.validateUpdateCardItemsParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("cardId"),
  handleParams("columnId"),
  handleParams("cardItem"),
  function (req, res, next) {
    handleError(req, res, next);
  },
];
exports.validateRemoveCardItemsParams = [
  handleParams("userId"),
  handleParams("cardId"),
  handleParams("cardItem"),
  function (req, res, next) {
    handleError(req, res, next);
  },
];
