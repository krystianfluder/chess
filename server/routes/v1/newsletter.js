const express = require("express");
const { body } = require("express-validator");
const newsletterController = require("../../controllers/newsletter");
const { catchAsync } = require("../../middleware/errors");
// const { isAuth } = require("../../middleware/auth");

const router = express.Router();

// router.use(isAuth);

// router.get("/", catchAsync(orderController.getOrders));

// router.get("/:id", catchAsync(orderController.getOrder));

// router.delete("/:id", catchAsync(orderController.deleteOrder));

router.post(
  "/",
  [body("email").isEmail(), body("from").trim().escape()],
  catchAsync(newsletterController.signUp)
);

module.exports = router;
