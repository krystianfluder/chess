const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const RefreshToken = require("../models/refresh-token");
const { v4 } = require("uuid");
const { transporter } = require("../config/mails");
const useragent = require("useragent");
const {
  handleErrorValidationFailed,
  handleError,
  handleErrorUserExists,
  handleErrorTokenInvalidOrExpired,
} = require("../util/errors");

const { createAccessToken, createRefreshToken } = require("../util/token");

const getIpAndAgent = (req) => {
  const ip =
    (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const agent = { ...useragent.parse(req.headers["user-agent"]) };
  return [ip, agent];
};

exports.getStatus = async (req, res, next) => {
  const refreshTokens = await RefreshToken.find({
    userId: req.userId,
  })
    .lean()
    .select("ip useragent createdAt updatedAt");

  res.json({
    message: "List of logged in devices",
    refreshTokens,
  });
};

exports.refreshToken = async (req, res, next) => {
  const last = await RefreshToken.findOne({
    token: req.body.token,
  }).select("token");

  if (!last) {
    return next(handleError("Incorrect refresh token", 401));
  }

  let parsePayload = null;

  jwt.verify(
    last.token,
    process.env.JWT_REFRESH_SECRET,
    async (err, payload) => {
      if (err) {
        return next(handleErrorTokenInvalidOrExpired());
      }
      if (payload) {
        parsePayload = payload;
      }
    }
  );

  const payload = {
    userId: parsePayload.userId,
    email: parsePayload.email,
  };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);
  const [ip, agent] = getIpAndAgent(req);

  await Promise.all([
    last.remove(),
    new RefreshToken({
      userId: parsePayload.userId,
      ip,
      useragent: agent,
      token: refreshToken,
    }).save(),
  ]);

  res.json({
    message: "Token refreshed successfully",
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(handleErrorValidationFailed());
  }

  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  })
    .select("password")
    .lean();

  if (!user) {
    return next(handleError("Email or password is incorrect", 401));
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(handleError("Email or password is incorrect", 401));
  }

  const [ip, agent] = getIpAndAgent(req);

  const payload = { userId: user._id.toString(), email };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  await new RefreshToken({
    token: refreshToken,
    userId: user._id,
    ip,
    useragent: agent,
  }).save();

  res.json({
    message: "User logged in successfully",
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(handleErrorValidationFailed());
  }

  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  })
    .select("password")
    .lean();

  if (user) {
    return next(handleErrorUserExists());
  }

  const [ip, agent] = getIpAndAgent(req);

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await new User({
    email,
    password: hashedPassword,
  }).save();

  const payload = { userId: createdUser._id.toString(), email };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  await new RefreshToken({
    token: refreshToken,
    userId: createdUser._id,
    ip,
    useragent: agent,
  }).save();

  res.json({
    message: "User created in successfully",
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

// logout section

exports.logout = async (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return next(handleError("Refresh token does not exist", 422));
  }

  const refreshToken = await RefreshToken.findOne({
    token,
  });

  if (!refreshToken) {
    return next(handleError("Refresh token does not exist", 422));
  }

  await refreshToken.remove();

  res.json({
    message: "User logged out successfully",
  });
};

exports.logoutAll = async (req, res, next) => {
  const refreshTokens = await RefreshToken.find({
    userId: req.userId,
  });

  if (!refreshTokens) {
    return next(handleError("Refresh token does not exist"));
  }

  refreshTokens.forEach(async (token) => {
    await token.remove();
  });

  res.json({
    message: "User logged out successfully",
  });
};

// for improvement - performance
exports.reset = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(handleErrorValidationFailed());
  }

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(handleError("Email does not exist", 401));
  }

  // logout all

  const resetToken = v4() + new Date().getTime();

  user.resetToken = resetToken;
  user.resetExp = new Date(new Date().getTime() + 1000 * 60 * 20);
  await user.save();
  // send email with code

  await transporter.sendMail({
    from: "test@test.com",
    to: user.email,
    subject: "Hello ✔", // Subject line
    // text: "", // plain text body
    html: `<b>Code: ${resetToken}</b>`, // html
  });

  res.json({
    message: "Code for changing the password has been sent to the email",
  });
};

exports.changePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(handleErrorValidationFailed());
  }

  const { code, password } = req.body;
  const user = await User.findOne({ resetToken: code });

  if (!user) {
    return next(handleError("The code is invalid", 401));
  }
  if (user.code === null) {
    return next(handleError("The code is invalid", 401));
  }
  const codeExp = new Date(user.resetExp).getTime();
  if (new Date().getTime() > codeExp) {
    return next(handleError("Code has expired", 401));
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;
  user.resetToken = null;
  user.exp = null;
  user.save();

  res.json({
    message: "Password changed successfully",
  });
};

// change email
