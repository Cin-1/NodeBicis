var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//We create a bicicleta Schema from moongose
var bicicletaSchema = new Schema({
  code: Number,
  color: String,
  modelo: String,
  ubicacion: {
    type: [Number],
    index: { type: "2dsphere", sparse: true },
  },
});

//We add a functionality to create a INSTANCE of bicicleta
bicicletaSchema.statics.createInstance = function (
  code,
  color,
  modelo,
  ubicacion
) {
  return new this({
    code,
    color,
    modelo,
    ubicacion,
  });
};

/* Note cb is callback (function as parammeter)
We use the callback in order to see what is the result affeter
excute the function (create,findoOne,deleteOne) from moongoose
*/

//We override the method tostring
bicicletaSchema.methods.toString = function () {
  return `code: ${this.code}  | color: ${this.color}`;
};
//We add a funtionality to get all Bici
bicicletaSchema.statics.allBicis = function (cb) {
  return this.find({}, cb);
};

bicicletaSchema.statics.add = function (aBici, cb) {
  this.create(aBici, cb);
};

bicicletaSchema.statics.findByCode = function (aCode, cb) {
  return this.findOne({ code: aCode }, cb);
};

bicicletaSchema.statics.removeByCode = function (aCode, cb) {
  return this.deleteOne({ code: aCode }, cb);
};

module.exports = mongoose.model("Bicicleta", bicicletaSchema);

// var Bicicleta = function (id, color, modelo, ubicacion) {
//   this.id = id;
//   this.color = color;
//   this.modelo = modelo;
//   this.ubicacion = ubicacion;
// };

// Bicicleta.prototype.toString = function () {
//   return "id:     " + this.id + " color :  " + this.color;
// };

// Bicicleta.allBicis = [];

// Bicicleta.add = function (aBici) {
//   Bicicleta.allBicis.push(aBici);
// };

// Bicicleta.findById = function (aBiciId) {
//   var aBici = Bicicleta.allBicis.find((x) => x.id == aBiciId);

//   if (aBici) return aBici;
//   else throw new Error(`No existe una bicicleta con el id ` + aBiciId);
// };

// Bicicleta.removeById = function (aBiciId) {
//   for (let index = 0; index < Bicicleta.allBicis.length; index++) {
//     if (Bicicleta.allBicis[index].id === aBiciId) {
//       Bicicleta.allBicis.splice(index, 1);
//       break;
//     }
//   }
// };

// var a = new Bicicleta(1, "rojo", "deportiva", [-34.571358, -58.633972]);
// var b = new Bicicleta(2, "azul", "playera", [-34.574359, -58.642015]);

// Bicicleta.add(a);
// Bicicleta.add(b);

// module.exports = Bicicleta;
