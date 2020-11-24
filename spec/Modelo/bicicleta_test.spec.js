var mongoose = require("mongoose");
const Bicicleta = require("../../Model/bicicleta");

//mongodb://localhost/testdb  <-- Datbase for Test purpose
describe("Testing Bicicletas", function () {
  beforeEach(function (done) {
    setTimeout(function () {
      //Connection to the Database (Test Database)
      var mongoDB = "mongodb://localhost/testdb";
      mongoose.connect(mongoDB, { useNewUrlParser: true });
      const db = mongoose.connection;
      db.on("error", console.error.bind(console, "connection error"));
      db.once("open", function () {
        console.log("We are connected to test database!");
      });
      done(); // es par terminar el beforeEach de otra manera no terminaria el metodo
    }, 100);
  });

  //after is call each in each Test
  //Delete everthing from test Database
  afterEach(function (done) {
    Bicicleta.deleteMany({}, function (err, success) {
      done();
      if (err) console.log(err);
    });
  });

  //Test when we create a Instance
  describe("Bicicleta.createInstance", () => {
    it("crea una instancia de Bicicleta", () => {
      var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

      expect(bici.code).toBe(1);
      expect(bici.color).toBe("verde");
      expect(bici.modelo).toBe("urbana");
      expect(bici.ubicacion[0]).toEqual(-34.5);
      expect(bici.ubicacion[1]).toEqual(-54.1);
    });
  });

  //test to get all Bicis
  describe("Bicicleta.allBicis", () => {
    it("comienza vacia", (done) => {
      //pass a function (callback)
      Bicicleta.allBicis(function (err, bicis) {
        expect(bicis.length).toBe(0); //has to be empty at the begining
        done();
      });
    });
  });

  describe("Bicicleta.add", () => {
    it("agrega solo una bici", (done) => {
      var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
      Bicicleta.add(aBici, function (err, newBici) {
        if (err) console.log(err);
        //Here we are inside the callback , the adding(bicicleta) has just happend
        Bicicleta.allBicis(function (err, bicis) {
          expect(bicis.length).toEqual(1); //make sure taht we add a bicicleta
          expect(bicis[0].code).toEqual(aBici.code); //make sure was added the bicicleta correctly
          done(); //is used to solve problems of asynchronism
        });
      });
    });
  });

  describe("Bicicleta.findByCode", () => {
    it("debe de devolver la bici con code 1", (done) => {
      Bicicleta.allBicis(function (err, bicis) {
        expect(bicis.length).toBe(0); // We use expect here becaouse in each test  we delete the data from test database so data has to be empty

        //we add a bicicleta
        var aBici = new Bicicleta({
          code: 1,
          color: "verde",
          modelo: "urbana",
        });
        Bicicleta.add(aBici, function (err, newBici) {
          if (err) console.log(err);

          //we add a second bicicleta
          var aBici2 = new Bicicleta({
            code: 2,
            color: "roja",
            modelo: "deportiva",
          });
          Bicicleta.add(aBici2, function (err, newBici) {
            if (err) console.log(err);

            //test if we add correectly the first bicicleta added
            Bicicleta.findByCode(1, function (error, targetBici) {
              expect(targetBici.code).toBe(aBici.code);
              expect(targetBici.color).toBe(aBici.color);
              expect(targetBici.modelo).toBe(aBici.modelo);
              done();
            });
          });
        });
      });
    });
  });
});

// beforeEach(() => {
//   Bicicleta.allBicis = [];
// });

// describe("Bicicleta.allBicis", () => {
//   it("comienza vacia", () => {
//     expect(Bicicleta.allBicis.length).toBe(0);
//   });
// }), -

// describe("Bicicleta.add", () => {
//   it("agregamos una", () => {
//     expect(Bicicleta.allBicis.length).toBe(0);
//     var a = new Bicicleta(3, "dfdf", "sdsdsd", [-34.571358, -58.633972]);
//     Bicicleta.add(a);
//     expect(Bicicleta.allBicis.length).toBe(1);
//     expect(Bicicleta.allBicis[0]).toBe(a);
//   });
// });

// describe("Bicicleta.findById", () => {
//   i"Debe devolver la bici con ID 4", () => {
//     //Bicicleta.allBicis = []; //reseteo los tests en cada paso
//     var abici = new Bicicleta(4, "verde", "urbana");
//     var abici2 = new Bicicleta(5, "azul", "urbana");
//     Bicicleta.add(abici);
//     Bicicleta.add(abici2);
//     var tagetBici = Bicicleta.findById(4);
//     expect(tagetBici.id).toBe(4);
//     expect(tagetBici.modelo).toBe(abici.modelo);
//     expect(tagetBici.color).toBe(abici.color);
//   });
// });

// describe("Bicicleta.removeById", () => {
//   it("Debe remove la bici con ID 1", () => {
//     var abici = new Bicicleta(1, "verde", "urbana");
//     var abici2 = new Bicicleta(2, "azul", "urbana");
//     Bicicleta.add(abici);
//     Bicicleta.add(abici2);
//     expect(Bicicleta.allBicis.length).toBe(2);
//     Bicicleta.removeById(1);
//     Bicicleta.removeById(2);
//     expect(Bicicleta.allBicis.length).toBe(0);
//   });
// });
