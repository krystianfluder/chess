const express = require("express");
const rateLimit = require("express-rate-limit");

const { body } = require("express-validator");
const { catchAsync } = require("../../middleware/errors");
const { isAuth } = require("../../middleware/auth");
const userController = require("../../controllers/auth");

const router = express.Router();

const isValid = [
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
];

router.get("/status", isAuth, catchAsync(userController.getStatus));

router.post("/refresh-token", catchAsync(userController.refreshToken));

router.post("/login", isValid, catchAsync(userController.login));

// const createAccountLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour window
//   max: 5, // start blocking after 5 requests
//   message:
//     "Too many accounts created from this IP, please try again after an hour",
// });

router.post(
  "/register",
  // createAccountLimiter,
  isValid,
  catchAsync(userController.register)
);

router.post("/logout", isAuth, catchAsync(userController.logout));
router.post("/logout-all", isAuth, catchAsync(userController.logoutAll));

// const resetAccountLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour window
//   max: 5, // start blocking after 5 requests
//   message:
//     "Too many password reset from this IP, please try again after an hour",
// });

router.post(
  "/reset",
  // resetAccountLimiter,
  [body("email").isEmail()],
  catchAsync(userController.reset)
);

router.post(
  "/change-password",
  [
    body("code").not().isEmpty().trim().escape().isLength({ min: 8 }),
    body("password").isLength({ min: 8 }),
  ],
  catchAsync(userController.changePassword)
);

// change email

module.exports = router;
