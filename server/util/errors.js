const handleError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

exports.handleError = handleError;

exports.handleErrorTokenBlacklisted = () =>
  handleError("Token blacklisted. Cannot use this token.", 401);

exports.handleErrorWithoutToken = () =>
  handleError("The token must be provided", 401);

exports.handleErrorValidationFailed = () =>
  handleError("Validation failed, entered data is incorrect", 422);

exports.handleErrorNotFoundUser = () => handleError("Not found user", 404);

exports.handleErrorUserExists = () => handleError("Email exists", 422);

exports.handleErrorTokenInvalidOrExpired = () =>
  handleError("The token is invalid or has expired", 401);
