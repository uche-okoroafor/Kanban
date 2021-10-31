const { check, validationResult } = require("express-validator");

exports.validateRemoveBoardParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateUserIdParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateCreateColumnParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  check("columnTitle", "columnTitle is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateUpdateColumnParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  check("columnTitle", "columnTitle is not defined").not().isEmpty(),
  check("columnId", "columnId is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateColumnParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  check("columnId", "columnId is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateMoveCardOutParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  check("initialColumnId", "initialColumnId is not defined").not().isEmpty(),
  check("targetColumnId", "targetColumnId is not defined").not().isEmpty(),
  check("cardId", "cardId is not defined").not().isEmpty(),
  check("targetPosition", "targetPosition is not defined").not().isEmpty(),
  check("cardObject", "cardObject is not defined").not().isEmpty(),
  (req, res, next) => {
    console.log("valide 2");
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateMoveCardInParams = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  check("columnId", "columnId is not defined").not().isEmpty(),
  check("cardId", "cardId is not defined").not().isEmpty(),
  check("targetPosition", "targetPosition is not defined").not().isEmpty(),
  check("cardObject", "cardObject is not defined").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.valide = [
  check("userId", "userId is not defined").not().isEmpty(),
  check("boardId", "boardId is not defined").not().isEmpty(),
  check("initialColumnId", "initialColumnId is not defined").not().isEmpty(),
  check("targetColumnId", "targetColumnId is not defined").not().isEmpty(),
  check("cardId", "cardId is not defined").not().isEmpty(),
  check("targetPosition", "targetPosition is not defined").not().isEmpty(),
  check("cardObject", "cardObject is not defined").not().isEmpty(),
  (req, res, next) => {
    console.log("valide 1");
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
