require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

var fs = require("fs");
var morgan = require("morgan");
var path = require("path");

const v1Routes = require("./routes/v1");
const { corsOptions } = require("./config/cors");

const { notFound, catchErrors } = require("./middleware/errors");

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined", { stream: accessLogStream }));
}

app.use("/static", express.static("static"));
app.use("/v1", v1Routes);

app.use(notFound);
app.use(catchErrors);

exports.app = app;
