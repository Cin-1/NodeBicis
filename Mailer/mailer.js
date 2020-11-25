const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "queen.weissnat@ethereal.email",
    pass: "Ev4BN8QYnQznp2QcvG",
  },
});

module.exports = nodemailer.createTransport(transporter);
