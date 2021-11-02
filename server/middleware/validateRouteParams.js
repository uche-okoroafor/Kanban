const { check, validationResult } = require("express-validator");

const handleParams = (params) => {
  return check(params, ` ${params} is not defined`).not().isEmpty();
};
const handleError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

exports.validateRemoveBoardParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleError(req, res, next),
];

exports.validateUserIdParams = [
  handleParams("userId"),
  handleError(req, res, next),
];

exports.validateCreateColumnParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("columnTitle"),
  handleError(req, res, next),
];

exports.validateUpdateColumnParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("columnId"),
  handleParams("columnTitle"),
  handleError(req, res, next),
];

exports.validateColumnParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("columnId"),
  handleError(req, res, next),
];

exports.validateMoveCardOutParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("initialColumnId"),
  handleParams("targetColumnId"),
  handleParams("cardId"),
  handleParams("targetPosition"),
  handleParams("cardObject"),
  handleError(req, res, next),
];

exports.validateMoveCardInParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("columnId"),
  handleParams("cardId"),
  handleParams("targetPosition"),
  handleParams("cardObject"),
  handleError(req, res, next),
];

exports.validateCreateCardParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("cardTitle"),
  handleParams("tagColor"),
  handleParams("columnId"),
  handleError(req, res, next),
];
