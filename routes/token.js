var express = require("express");
var router = express.Router();
var tokenController = require("../controllers/token");

router.get("/confirmation/:token", tokenController.confirmacion_get);

module.exports = router;
