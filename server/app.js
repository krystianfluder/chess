require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

var fs = require("fs");
var morgan = require("morgan");
var path = require("path");

// https://www.npmjs.com/package/express-rate-limit

const v1Routes = require("./routes/v1");
const { corsOptions } = require("./config/cors");

const { notFound, catchErrors } = require("./middleware/errors");

const app = express();

app.use(cors());
// app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
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

app.get("/", (req, res, next) => {
  const CHECKOUT_SESSION_ID = "";

  res.send(
    `<html>
        <head>
          
        </head>
        <body>
          <button id="checkout-button">Checkout</button>
          <script src="https://js.stripe.com/v3/"></script>
          <script>
            var stripe = Stripe('${process.env.STRIPE_PUBLISHABLE_KEY}');

            var checkoutButton = document.getElementById('checkout-button');
            checkoutButton.addEventListener('click', function() {
              stripe.redirectToCheckout({
                sessionId: '${CHECKOUT_SESSION_ID}'
              }).then(function (result) {
                console.log(result)
              });
            });
          </script>
        </body>
      </html>`
  );
});

app.get("/success", (req, res, next) => {
  res.send("success");
});

app.get("/cancel", (req, res, next) => {
  res.send("cancel");
});

app.use(notFound);
app.use(catchErrors);

exports.app = app;
