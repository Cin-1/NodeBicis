var Usuario = require("../Model/usuario");
var Token = require("../Model/token");

module.exports = {
  confirmacion_get: function (req, res, next) {
    Token.findOne({ token: req.params.token }, function (error, token) {
      if (!token) {
        return res
          .status(400)
          .json({ type: "not-verified", message: "Token no encontrado." });
      }
      Usuario.findById(token._userId, function (err, usuario) {
        if (!usuario) {
          res
            .status(401)
            .json({ message: "No encontramos un usuario con ese token" });
        }
        if (usuario.verificado) return res.redirect("/usuarios");
        usuario.verificado = true;
        usuario.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err, message });
          }
          res.redirect("/");
        });
      });
    });
  },
};
