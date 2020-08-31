exports.catchAsync = (fn) => {
  return (req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) {
      routePromise.catch((err) => next(err));
    }
  };
};

exports.notFound = (req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
};

exports.catchErrors = (err, req, res, next) => {
  const { message, status } = err;
  res.status(status || 500);
  res.json({
    message,
  });
};
