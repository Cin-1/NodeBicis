let Bicicleta = require("../../Model/bicicleta");
var request = require("request"); // library

//the following runs the server one time
//var server = require('../../bin/www'); //import server so take care your server has to be off

describe(" Bicicleta API", () => {
  describe("GET BICICLETAS /", () => {
    it("Status 200", () => {
      expect(Bicicleta.allBicis.length).toBe(0);

      var a = new Bicicleta(1, "rojo", "urbana", [21.844862, -102.254499]);
      Bicicleta.add(a); //adding a bicicleta
      request.get("http://localhost:3006/api/bicicletas", function (
        error,
        response,
        body
      ) {
        expect(response.statusCode).toBe(200);
      });
    });
  });
});

describe("POST BICICLETAS/create", () => {
  it("STATUS 200", (done) => {
    var headers = { "content-type": "application/json" };
    var aBici =
      '{"id": 100 , "color":"rojo", "modelo":"pista", "lat":-34, "lng":-55 }';
    request.post(
      {
        headers: headers,
        url: "http://localhost:3006/api/bicicletas/create",
        body: aBici,
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        expect(response.statusCode).toBe(200);
        //expect(Bicicleta.findById(10).color).toBe("rojo");

        done(); //helps to tell a jasmine(library) wait for the execution of request to finalize the test
      }
    );
  });
});

// let Bicicleta = require("../../Model/bicicleta");
// let request = require("request");
// let server = require("../../bin/www");

// describe("Bicicleta API", () => {
//   describe("GET BICICLETAS /", () => {
//     it("status 200", () => {
//       expect(Bicicleta.allBicis.length).toBe(0);
//       var a = new Bicicleta(3, "negro", "urbana", [-34.571358, -58.633972]);
//       Bicicleta.add(a);
//       request.get("http://localhost:5000/api/bicicletas", function (
//         error,
//         response,
//         body
//       ) {
//         expect(response.statusCode).toBe(200);
//       });
//     });
//   });
//   describe("POST BICICLETAS /create", () => {
//     it("status 200", (done) => {
//       var headers = { "content-type": "application/json" };
//       var abici =
//         '{"id":6,"color": "red","modelo": "mgdgon","lat": -34, "lng": -58}';
//       request.post(
//         {
//           headers: headers,
//           url: "http://localhost:5000/api/bicicletas/create",
//           body: abici,
//         },
//         function (error, response, body) {
//           expect(response.statusCode).toBe(200);
//           expect(Bicicleta.findById(6).color).toBe("red");
//           done();
//         }
//       );
//     });
//   });

//   describe("POST BICICLETAS /update", () => {
//     it("status 200", (done) => {
//       var headers = { "content-type": "application/json" };
//       var abici =
//         '{"id":6,"color": "blue","modelo": "automatica","lat": -36, "lng": -59}';
//       request.post(
//         {
//           headers: headers,
//           url: "http://localhost:5000/api/bicicletas/6/update",
//           body: abici,
//         },
//         function (error, response, body) {
//           expect(response.statusCode).toBe(200);
//           expect(Bicicleta.findById(6).color).toBe("blue");
//           done();
//         }
//       );
//     });
//   });
//   describe("DELETE BICICLETAS /delete", () => {
//     it("status 200", (done) => {
//       var headers = { "content-type": "application/json" };
//       var abici = '{"id":6}';
//       request.post(
//         {
//           headers: headers,
//           url: "http://localhost:5000/api/bicicletas/delete",
//           body: abici,
//         },
//         function (error, response, body) {
//           expect(response.statusCode).toBe(204);
//           done();
//         }
//       );
//     });
//   });
// });
