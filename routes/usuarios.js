var express = require("express");
var router = express.Router();
var usuariosController = require("../controllers/usuarios");

router.get("/", usuariosController.bicicleta_list);
router.get("/create", usuariosController.bicicleta_create_get);
router.post("/create", usuariosController.bicicleta_create_post);
router.get("/:id/update", usuariosController.bicicleta_update_get);
router.post("/:id/update", usuariosController.bicicleta_update_post);
router.post("/:id/delete", usuariosController.bicicleta_delete_post);

module.exports = router;
