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

exports.validateCreateCardParams = [
  handleParams("boardId"),
  handleParams("cardTitle"),
  handleParams("tagColor"),
  handleParams("columnId"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];

exports.validateUpdateCardItemsParams = [
  handleParams("boardId"),
  handleParams("cardId"),
  handleParams("columnId"),
  handleParams("cardItem"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];

exports.validateRemoveCardItemsParams = [
  handleParams("cardId"),
  handleParams("cardItem"),
  (req, res, next) => {
    handleError(req, res, next);
  },
];
