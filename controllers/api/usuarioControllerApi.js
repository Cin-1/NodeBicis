var Usuario = require("../../Model/usuario");

exports.usuarios_list = (req, res) => {
  Usuario.find({}, (err, usuarios) => {
    res.status(200).json({
      usuarios: usuarios,
    });
  });
};

exports.usuarios_create = (req, res) => {
  var usuario = new Usuario({ nombre: req.body.nombre });

  usuario.save((err) => {
    res.status(200).json({
      usuario: usuario,
    });
  });
};

exports.usuarios_reservar = (req, res) => {
  Usuario.findById(req.body.id, (err, usuario) => {
    console.log(err);
    usuario.reservar(req.body.biciID, req.body.desde, req.body.hasta, (err) => {
      console.log("Reserva !!!");
      res.status(200).send();
    });
  });
};
