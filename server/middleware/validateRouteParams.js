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

exports.validateAddBoardParams = [
  handleParams("userId"),
  handleParams("boardTitle"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];

exports.validateRemoveBoardParams = [
  handleParams("userId"),
  handleParams("boardId"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];

exports.validateUserIdParams = [
  handleParams("userId"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];

exports.validateCreateColumnParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("columnTitle"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];

exports.validateUpdateColumnParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("columnId"),
  handleParams("columnTitle"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];

exports.validateColumnParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("columnId"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];

exports.validateMoveCardOutParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("initialColumnId"),
  handleParams("targetColumnId"),
  handleParams("cardId"),
  handleParams("targetPosition"),
  handleParams("cardObject"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];

exports.validateMoveCardInParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("columnId"),
  handleParams("cardId"),
  handleParams("targetPosition"),
  handleParams("cardObject"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];

exports.validateCreateCardParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("cardTitle"),
  handleParams("tagColor"),
  handleParams("columnId"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];
