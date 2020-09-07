const express = require("express");
const { body } = require("express-validator");
const newsletterController = require("../../controllers/newsletter");
const { catchAsync } = require("../../middleware/errors");

const router = express.Router();

router.post(
  "/",
  [body("email").isEmail(), body("from").trim().escape()],
  catchAsync(newsletterController.signUp)
);

module.exports = router;
