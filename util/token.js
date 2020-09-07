const jwt = require("jsonwebtoken");

exports.createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * process.env.JWT_EXPIRATION_MINUTES, // seconds
  });
};

exports.createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: 60 * process.env.JWT_REFRESH_EXPIRATION_MINUTES, // seconds
  });
};
