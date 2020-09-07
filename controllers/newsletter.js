const { validationResult } = require("express-validator");
const UserNewsletter = require("../models/user-newsletter");

const {
  handleErrorValidationFailed,
  handleErrorUserExists,
} = require("../util/errors");

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(handleErrorValidationFailed());
  }

  const { email, from } = req.body;

  const searchEmail = await UserNewsletter.findOne({
    email,
  });

  if (searchEmail) {
    return next(handleErrorUserExists());
  }

  const userNewsletter = new UserNewsletter({
    email,
    from,
  });

  await userNewsletter.save();

  res.status(200).json({
    message: "Email saved",
    userNewsletter,
  });
};
