const nodemailer = require("nodemailer");

const mailConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "jonathan.leffler@ethereal.email",
    pass: "tsQyChqv68e5Hp34Jt",
  },
};

module.exports = nodemailer.createTransport(mailConfig);
