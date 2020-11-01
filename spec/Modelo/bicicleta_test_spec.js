let Bicicleta = require("../../Model/bicicleta");

beforeEach(() => {
  Bicicleta.allBicis = [];
});

describe("Bicicleta.allBicis", () => {
  it("comienza vacia", () => {
    expect(Bicicleta.allBicis.length).toBe(0);
  });
});

describe("Bicicleta.add", () => {
  it("agregamos una", () => {
    expect(Bicicleta.allBicis.length).toBe(0);
    var a = new Bicicleta(3, "dfdf", "sdsdsd", [-34.571358, -58.633972]);
    Bicicleta.add(a);
    expect(Bicicleta.allBicis.length).toBe(1);
    expect(Bicicleta.allBicis[0]).toBe(a);
  });
});

describe("Bicicleta.findById", () => {
  it("Debe devolver la bici con ID 1", () => {
    //Bicicleta.allBicis = []; //reseteo los tests en cada paso
    var abici = new Bicicleta(4, "verde", "urbana");
    var abici2 = new Bicicleta(5, "azul", "urbana");
    Bicicleta.add(abici);
    Bicicleta.add(abici2);
    var tagetBici = Bicicleta.findById(4);
    expect(tagetBici.id).toBe(4);
    expect(tagetBici.modelo).toBe(abici.modelo);
    expect(tagetBici.color).toBe(abici.color);
  });
});

describe("Bicicleta.removeById", () => {
  it("Debe remove la bici con ID 1", () => {
    var abici = new Bicicleta(1, "verde", "urbana");
    var abici2 = new Bicicleta(2, "azul", "urbana");
    Bicicleta.add(abici);
    Bicicleta.add(abici2);
    expect(Bicicleta.allBicis.length).toBe(2);
    Bicicleta.removeById(1);
    Bicicleta.removeById(2);
    expect(Bicicleta.allBicis.length).toBe(0);
  });
});
