var Bicicleta = require('../../Model/bicicleta');

exports.bicicleta_list = (req, res) => {
    Bicicleta.find({}, (err, bicicletas) => {
        res.status(200).json({
            bicicletas: bicicletas
        });
    });
}

exports.bicicleta_create = (req, res) => {
    let ubicacion = [req.body.lat, req.body.lng];
    var bicicleta = new Bicicleta({
        code: req.body.code, 
        color: req.body.color, 
        modelo: req.body.modelo, 
        ubicacion: ubicacion
    });
    bicicleta.save((err) => {
        res.status(200).json({
            bicicleta: bicicleta
        });
    });
}

exports.bicicleta_delete = (req, res) => {
    Bicicleta.removeByCode(req.body.code, (err)=>{
        // 204 - No hay contenido en la respuesta
        res.status(204).send();    
    });
}

exports.bicicleta_update = (req, res) => {
    if(req.body.lat && req.body.lng)
        req.body.ubicacion = [req.body.lat, req.body.lng];

    Bicicleta.updateByCode(req.params.id, req.body, (err) =>{
        if(err) console.log(err);
        res.status(200).json({
            updateBici: req.body
        });
    });
}
