let Bicicleta = require("../../Model/bicicleta");
let request = require("request");
//let server = require("../../bin/www");

describe("Bicicleta API", () => {
  describe("GET BICICLETAS /", () => {
    it("status 200", () => {
      expect(Bicicleta.allBicis.length).toBe(0);
      var a = new Bicicleta(3, "dfdf", "sdsdsd", [-34.571358, -58.633972]);
      Bicicleta.add(a);
      request.get("http://localhost:3006/api/bicicletas", function (
        error,
        response,
        body
      ) {
        expect(response.statusCode).toBe(200);
      });
    });
  });
  describe("POST BICICLETAS /create", () => {
    it("status 200", (done) => {
      var headers = { "content-type": "application/json" };
      var abici =
        '{"id":6,"color": "red","modelo": "mgdgon","lat": -34, "lng": -58}';
      request.post(
        {
          headers: headers,
          url: "http://localhost:3006/api/bicicletas/create",
          body: abici,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(200);
          //  expect(Bicicleta.findById(1).color).toBe("red");
          done();
        }
      );
    });
  });

  describe("POST BICICLETAS /update", () => {
    it("status 200", (done) => {
      var headers = { "content-type": "application/json" };
      var abici =
        '{"id":6,"color": "blue","modelo": "automatica","lat": -36, "lng": -59}';
      request.post(
        {
          headers: headers,
          url: "http://localhost:3006/api/bicicletas/6/update",
          body: abici,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(200);
          expect(Bicicleta.findById(6).color).toBe("blue");
          done();
        }
      );
    });
  });
  describe("DELETE BICICLETAS /delete", () => {
    it("status 200", (done) => {
      var headers = { "content-type": "application/json" };
      var abici = '{"id":6}';
      request.post(
        {
          headers: headers,
          url: "http://localhost:3006/api/bicicletas/delete",
          body: abici,
        },
        function (error, response, body) {
          expect(response.statusCode).toBe(204);
          done();
        }
      );
    });
  });
});
