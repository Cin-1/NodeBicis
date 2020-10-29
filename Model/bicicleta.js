var Bicicleta = function (id, color, modelo, ubicacion) {
  this.id = id;
  this.color = color;
  this.modelo = modelo;
  this.ubicacion = ubicacion;
};

Bicicleta.prototype.toString = function () {
  return "id:     " + this.id + " color :  " + this.color;
};

Bicicleta.allBicis = [];

Bicicleta.add = function (aBici) {
  Bicicleta.allBicis.push(aBici);
};

var a = new Bicicleta(1, "rojo", "deportiva", [-34.571358, -58.633972]);
var b = new Bicicleta(1, "azul", "playera", [-34.574359, -58.642015]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;
