const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { catchAsync } = require("./errors");
const {
  handleError,
  handleErrorWithoutToken,
  handleErrorTokenInvalidOrExpired,
} = require("../util/errors");

const handleToken = (req) => {
  const headers = req.headers["authorization"];
  if (headers) {
    return headers.split(" ")[1];
  }
  return null;
};

exports.isAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId).lean().select("role");
  if (user.role !== "admin") {
    return next(handleError("You do not have admin", 403));
  }
  return next();
});

exports.isAuth = catchAsync(async (req, res, next) => {
  const token = handleToken(req);

  if (!token) {
    return next(handleErrorWithoutToken());
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return next(handleErrorTokenInvalidOrExpired());
    }
    if (payload) {
      req.userId = payload.userId;
      return next();
    }
  });
});
