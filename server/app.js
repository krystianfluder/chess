require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

var fs = require("fs");
var morgan = require("morgan");
var path = require("path");

const v1Routes = require("./routes/v1");

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    message: "Too many requests, please try again later.",
  },
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

// app.use(express.static(path.resolve("../client/build")));

app.use("/v1", v1Routes);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("../client/build/index.html"));
// });

exports.app = app;
