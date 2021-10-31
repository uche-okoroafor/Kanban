const { check, validationResult } = require("express-validator");

exports.validateCreateCardParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  check("cardTitle", "cardTitle is not defined").not().isEmpty(),
  check("tagColor", "tagColor is not defined").not().isEmpty(),
  check("columnId", "columnId is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateUpdateCardItemsParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  check("cardId", "cardId is not defined").not().isEmpty(),
  check("columnId", "columnId is not defined").not().isEmpty(),
  check("cardItem", "cardItem is not defined").not().isEmpty(),
  check("value", "value is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateRemoveCardItemsParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("cardId", "cardId is not defined").not().isEmpty(),
  check("cardItem", "cardItem is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
exports.validateCreateChecklistParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  check("cardId", "cardId is not defined").not().isEmpty(),
  check("columnId", "columnId is not defined").not().isEmpty(),
  check("checklistItem", "checklistItem is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateUpdateChecklistParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  check("cardId", "cardId is not defined").not().isEmpty(),
  check("columnId", "columnId is not defined").not().isEmpty(),
  check("checklistId", "checklistId is not defined").not().isEmpty(),
  check("checklistItem", "checklistItem is not defined").not().isEmpty(),
  check("isChecked", "isChecked is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateRemoveChecklistParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  check("cardId", "cardId is not defined").not().isEmpty(),
  check("columnId", "columnId is not defined").not().isEmpty(),
  check("checklistId", "checklistId is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
