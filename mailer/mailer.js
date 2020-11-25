const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'tre.hoppe39@ethereal.email',
        pass: 'gdrddSEs3gqeGRnsTH' 
    }
};

module.exports = nodemailer.createTransport(mailConfig);