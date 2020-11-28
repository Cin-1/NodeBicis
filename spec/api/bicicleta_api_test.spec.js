var mongoose = require("mongoose");
var Bicicleta = require("../../models/bicicleta");
var server = require("../../bin/www");
var request = require("request");

var base_url = "http://localhost:3006/api/bicicletas";

describe("Bicicleta API", () => {
  beforeAll((done) => {
    mongoose.connection.close(done);
  });

  beforeEach(function (done) {
    var mongoDB = "mongodb://localhost/testdb";
    mongoose.connect(mongoDB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function () {
      console.log("We are connected to test database!");
    });
    done();
  });

  afterEach(function (done) {
    Bicicleta.deleteMany({}, function (err, success) {
      if (err) console.log(err);
      done();
    });
  });

  describe("GET BICICLETAS /", () => {
    it("Status 200", (done) => {
      request.get(base_url, function (error, response, body) {
        var result = JSON.parse(body);
        expect(response.statusCode).toBe(200);
        expect(result.bicicletas).toBe(undefined);
        done();
      });
    });
  });

  describe("POST BICICLETAS /create", () => {
    it("Status 200", (done) => {
      var headers = { "content-type": "application/json" };
      var aBici = `{ "code": 10, "color": "rojo", "modelo" : "urbano", "lat": -34, "lng": -54 }`;
      request.post(
        {
          headers: headers,
          url: base_url + "/create",
          body: aBici,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(200);
          var bici = JSON.parse(body);
          console.log(bici);
          expect(bici.bicicleta.color).toBe("rojo");
          expect(bici.bicicleta.ubicacion[0]).toBe(-34);
          expect(bici.bicicleta.ubicacion[1]).toBe(-54);
          done();
        }
      );
    });
  });
});
