const handleError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

exports.handleError = handleError;

// validation

exports.handleErrorValidationFailed = () =>
  handleError("Validation failed, entered data is incorrect", 422);

// access token

exports.handleErrorWithoutToken = () =>
  handleError("The token must be provided", 400);

exports.handleErrorTokenInvalidOrExpired = () =>
  handleError("The token is invalid or has expired", 401);

// refresh token

exports.handleErrorIncorrectRefreshToken = () =>
  handleError("Incorrect refresh token or not provided", 401);

exports.handleErrorRefreshTokenNotExists = () =>
  handleError("Refresh token does not exist", 401);

exports.handleErrorNotFoundRefreshTokens = () =>
  handleError("Not found refresh tokens", 404);

// register login

exports.handleErrorUserExists = () => handleError("Email exists", 400);

exports.handleErrorEmailNotExists = () =>
  handleError("Email does not exist", 400);

exports.handleErrorEmailOrPasswordIncorrect = () =>
  handleError("Email or password is incorrect", 400);

// reset account

exports.handleErrorCodeInvalidOrExpired = () =>
  handleError("The code is invalid or expired", 401);
