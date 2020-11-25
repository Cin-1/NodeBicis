var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function (req, res){
    Bicicleta.find({}, function(err, bicis){
      res.status(200).json({
          bicicletas: bicis
      });
      })
        
  }

  exports.bicicleta_create = function (req, res){
    var bici = new Bicicleta({code: req.body.id, color: req.body.color, modelo: req.body.modelo});
    bici.ubicacion=([req.body.lat, req.body.lng]);
    
    Bicicleta.add(bici);
    res.status(200).json({
        bicicleta: bici
    });
  }

  exports.bicicleta_delete = async function (req, res){
    Bicicleta.removeByCode(req.body.id);
    res.status(204).send();
  }
  
  exports.bicicleta_update = async function (req, res){
    const bici = Bicicleta.updateBici(req.params.id, req.body.color, req.body.modelo, req.body.ubicacion);
    res.status(200).json({
        bicicleta: bici
    });
  }