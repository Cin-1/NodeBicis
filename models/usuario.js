const mongoose = require("mongoose");
const Reserva = require("./reserva");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Token = require("../models/token");
const mailer = require("../mailer/mailer");

const Schema = mongoose.Schema;
const saltRounds = 10;

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, "Este campo es obligatorio"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Este campo es obligatorio"],
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Por favor ingrese un correo válido"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    required: [true, "Este campo es obligatorio"],
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.plugin(uniqueValidator, {
  message: "El {PATH} ya existe con otro usuario",
});

usuarioSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

usuarioSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
  var reserva = new Reserva({
    usuario: this._id,
    bicicleta: biciId,
    desde: desde,
    hasta: hasta,
  });
  console.log(reserva);
  reserva.save(cb);
};

usuarioSchema.methods.enviar_mail_bienvenida = function (cb) {
  const token = new Token({
    _userId: this.id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  const email_destination = this.email;
  token.save(function (err) {
    if (err) {
      return console.log(err.message);
    }

    console.log(token.token);
    var enlace = "http://localhost:3006" + "/token/confirmacion/" + token.token;

    const mailOptions = {
      from: "no-reply@unmail.com",
      to: email_destination,
      subject: "Verificación de cuenta",
      text:
        "Hola, \n\n" +
        "Por favor, para verificar su cuenta haga click en este link: \n" +
        "http://localhost:3006"`\/token/confirmation\/` +
        token.token +
        ".\n",
    };

    mailer.sendMail(mailOptions, function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(
        "A verification email has been sent to " + email_destination + "."
      );
    });
  });
};

usuarioSchema.methods.resetPassword = function (cb) {
  const token = new Token({
    _userId: this.id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  const email_destination = this.email;
  token.save(function (err) {
    if (err) {
      return cb(err);
    }

    const mailOptions = {
      from: "no-reply@BicycleNetwork.com",
      to: email_destination,
      subject: "Password reset",
      text:
        "Hi,\n\n" +
        "Please click on this link to reset your account password:\n" +
        "http://localhost:3006" +
        "/resetPassword/" +
        token.token +
        "\n",
    };

    mailer.sendMail(mailOptions, function (err) {
      if (err) {
        return cb(err);
      }
      console.log(
        "An email to reset the password was sent to" + email_destination + "."
      );
    });

    cb(null);
  });
};

module.exports = mongoose.model("Usuario", usuarioSchema);
