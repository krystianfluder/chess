const nodemailer = require("nodemailer");
// https://nodemailer.com/about/

// nodemailer.createTransport({
//   pool: true,
//   host: "smtp.example.com",
//   port: 465,
//   secure: true, // use TLS
//   auth: {
//     user: "username",
//     pass: "password"
//   }
// });

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.SHOULD_SEND_EMAIL === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("nodemailer error");
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

exports.transporter = transporter;

// Configure your application
// Configure your application with the settings below.

// Server	smtp.sendgrid.net
// Ports
// 25, 587	(for unencrypted/TLS connections)
// 465	(for SSL connections)
// Username	apikey
// Password	YOUR_API_KEY
