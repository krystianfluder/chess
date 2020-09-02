const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const RefreshToken = require("../models/refresh-token");
const { v4 } = require("uuid");
const { transporter } = require("../config/mails");
const { createAccessToken, createRefreshToken } = require("../util/token");
const { getIpAndAgent } = require("../util/information");
const {
  handleErrorValidationFailed,
  handleErrorUserExists,
  handleErrorTokenInvalidOrExpired,
  handleErrorCodeInvalidOrExpired,
  handleErrorEmailNotExists,
  handleErrorEmailOrPasswordIncorrect,
  handleErrorRefreshTokenNotExists,
  handleErrorNotFoundRefreshTokens,
  handleErrorIncorrectRefreshToken,
} = require("../util/errors");

// messages

const handleMessage = (message) => {
  return { message };
};
const handleMessageChangePassword = () =>
  handleMessage("Password changed successfully");
const handleMessageReset = () =>
  handleMessage("Code for changing the password has been sent to the email");
const handleMessageLogout = () => handleMessage("User logged out successfully");
const handleMessageRegister = () =>
  handleMessage("User created in successfully");
const handleMessageLogin = () => handleMessage("User logged in successfully");
const handleMessageRefreshToken = () =>
  handleMessage("Token refreshed successfully");
const handleMessageGetStatus = () => handleMessage("List of logged in devices");

exports.getStatus = async (req, res, next) => {
  const refreshTokens = await RefreshToken.find({
    userId: req.userId,
  })
    .lean()
    .select("ip useragent createdAt updatedAt");

  res.json({
    ...handleMessageGetStatus(),
    refreshTokens,
  });
};

exports.refreshToken = async (req, res, next) => {
  const last = await RefreshToken.findOne({
    token: req.body.token,
  }).select("token");

  if (!last) {
    return next(handleErrorIncorrectRefreshToken());
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
    ...handleMessageRefreshToken,
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
    return next(handleErrorEmailOrPasswordIncorrect());
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(handleErrorEmailOrPasswordIncorrect());
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
    ...handleMessageLogin(),
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
    ...handleMessageRegister(),
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

// logout section

exports.logout = async (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return next(handleErrorRefreshTokenNotExists());
  }

  const refreshToken = await RefreshToken.findOne({
    token,
  });

  if (!refreshToken) {
    return next(handleErrorRefreshTokenNotExists());
  }

  await refreshToken.remove();

  res.json({
    ...handleMessageLogout(),
  });
};

exports.logoutAll = async (req, res, next) => {
  const refreshTokens = await RefreshToken.find({
    userId: req.userId,
  });

  if (!refreshTokens) {
    return next(handleErrorNotFoundRefreshTokens());
  }

  refreshTokens.forEach(async (token) => {
    await token.remove();
  });

  res.json({
    ...handleMessageLogout(),
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
    return next(handleErrorEmailNotExists());
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
    ...handleMessageReset(),
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
    return next(handleErrorCodeInvalidOrExpired());
  }
  if (user.code === null) {
    return next(handleErrorCodeInvalidOrExpired());
  }
  const codeExp = new Date(user.resetExp).getTime();
  if (new Date().getTime() > codeExp) {
    return next(handleErrorCodeInvalidOrExpired());
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;
  user.resetToken = null;
  user.exp = null;
  user.save();

  res.json({
    ...handleMessageChangePassword(),
  });
};

// change email
