var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Phone 974',datas:["samsung","iphone","LG"] }  );
});

module.exports = router;
