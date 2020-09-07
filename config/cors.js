var corsOptions = {
  // origin: "http://" + process.env.SERVER_HOST+ ,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

exports.corsOptions = corsOptions;
