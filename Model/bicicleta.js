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

Bicicleta.findById = function (aBiciId) {
  let aBici = Bicicleta.allBicis.find((x) => x.id === aBiciId);
  if (aBici) return aBici;
  else throw new Error(`No existe una bici con el id ${aBiciId}`);
};

Bicicleta.removeById = function (aBiciId) {
  for (let index = 0; index < Bicicleta.allBicis.length; index++) {
    if (Bicicleta.allBicis[index].id === aBiciId) {
      Bicicleta.allBicis.splice(index, 1);
      break;
    }
  }
};

var a = new Bicicleta(1, "rojo", "deportiva", [-34.571358, -58.633972]);
var b = new Bicicleta(2, "azul", "playera", [-34.574359, -58.642015]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;
