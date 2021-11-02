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
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("cardTitle"),
  handleParams("tagColor"),
  handleParams("columnId"),
  handleError(req, res, next),
];

exports.validateUpdateCardItemsParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("cardId"),
  handleParams("columnId"),
  handleParams("cardItem"),
  handleParams("value"),
  handleError(req, res, next),
];

exports.validateRemoveCardItemsParams = [
  handleParams("userId"),
  handleParams("cardId"),
  handleParams("cardItem"),
  handleError(req, res, next),
];
exports.validateCreateChecklistParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("cardId"),
  handleParams("columnId"),
  handleParams("checklistItem"),
  handleError(req, res, next),
];

exports.validateUpdateChecklistParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("cardId"),
  handleParams("columnId"),
  handleParams("checklistItem"),
  handleParams("checklistId"),
  handleParams("isChecked"),
  handleError(req, res, next),
];

exports.validateRemoveChecklistParams = [
  handleParams("userId"),
  handleParams("boardId"),
  handleParams("cardId"),
  handleParams("columnId"),
  handleParams("checklistId"),
  handleError(req, res, next),
];
