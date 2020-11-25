//min 11
var mongoose = require("mongoose");
var Reserva = require("./reserva");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const mailer = require("../Mailer/mailer");

var Schema = mongoose.Schema;

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)+@\w+([\.-]?\w+)*(\.\w(2,3))+$/;
  return re.test(email);
};

var usuarioSchema = new Schema({
  nombre: {
    type: String,
    trin: true,
    required: [true, "El nombre es obligatorio."],
  },
  email: {
    type: String,
    trin: true,
    required: [true, "El email es obligatorio."],
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Por favor ingrese un email valido."],
    match: [/^\w+([\.-]?\w+)+@\w+([\.-]?\w+)*(\.\w(2,3))+$/],
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio."],
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.plugin(uniqueValidator, {
  message: "El (PATH) ya existe con otro usuario.",
});

usuarioSchema.pre("save", function (next) {
  if (this.isModified["password"]) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

usuarioSchema.methods.validadPassword = function (password) {
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

usuarioSchema.methods.enviar_email_bienvenida = function (cb) {
  const token = new Token({
    _userId: this.id,
    token: cryptoRandomString(16).toString("hex"),
  });

  const email_destination = this.email;
  token.save(function (err) {
    if (err) {
      return console.log(err.message);
    }
    const mailoptions = {
      from: "queen.weissnat@ethereal.email",
      to: email_destination,
      subject: "Verificacion de cuenta",
      text:
        "Hola, \n\n" +
        "Por favor para verificar su cuenta clickee aqui: \n" +
        "http://localhost:3006/" +
        "/token/confirmation/" +
        token.token +
        ".\n",
    };
    mailer.sendMail(mailOptions, function (err) {
      if (err) {
        return console.log(err.message);
      }

      console.log(
        "Se ha enviado un email de bienvenida a " + email_destination + "."
      );
    });
  });
};

module.exports = mongoose.model("Usuario", usuarioSchema);
