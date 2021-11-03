const { check, validationResult } = require("express-validator");
const handleParams = (params) => {
  return check(params, `${params} is not defined`).not().isEmpty();
};
const handleErrors = (req, res, nex) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

exports.validateUserIdParams = [
  handleParams("userId"),
  (req, res, next) => {
    handleErrors(req, res, next);
  },
];
