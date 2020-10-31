var Bicicleta = require("../../Model/bicicleta");
const { bicicleta_delete_post, bicicleta_create_get } = require("../bicicleta");

exports.bicicleta_list = function (req, res) {
  res.status(200).json({
    bicicletas: Bicicleta.allBicis,
  });
};

exports.bicicleta_create = function (req, res) {
  let bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
  bici.ubicacion = [req.body.lat, req.body.lng];
  Bicicleta.add(bici);
  res.status(200).json({
    bicicletas: bici,
  });
};

exports.bicicleta_delete = function (req, res) {
  Bicicleta.removeById(req.body.id);
  res.status(204).send();
};