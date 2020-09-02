const express = require("express");
const { catchAsync } = require("../../middleware/errors");
const { isAuth } = require("../../middleware/auth");

const profileController = require("../../controllers/profile");

const router = express.Router();

router.use(isAuth);

router.get("/", catchAsync(profileController.getProfile));

module.exports = router;
