var express = require('express');
var router = express.Router();

var data = require("../controllers/phonesController");
var jwtC = require("../controllers/jwtController");

//recuperer les datas
router.get("/", data.list);

//voir un data par son id
router.get("/show/:id", data.show);

//cree un data
router.get("/create", jwtC.ensureToken, jwtC.verifAdmin, data.create);

//sauvegarder un data. /!\ cest un POST 
router.post("/save", data.save);

//editer un data
router.get("/edit/:id", data.edit);

//edit update.  /!\ cest un POST 
router.post("/update/:id", data.update);


//export du module router
module.exports = router;
