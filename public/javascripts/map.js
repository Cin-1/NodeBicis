var map = L.map("mainmap").setView([-34.5800677, -58.6344017], 15);
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([-34.583813, -58.632599]).addTo(map);

$.ajax({
  dataType: "json",
  url: "api/bicicletas",
  success: function (result) {
    console.log(result);
    result.bicicletas.forEach((bici) => {
      L.marker(bici.ubicacion, { title: bici.id }).addTo(map);
    });
  },
});
