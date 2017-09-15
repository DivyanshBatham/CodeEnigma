var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('editor2', { title: 'Editor2', lang: "" });
});

router.get('/:lang', function(req, res, next) {


  // 404 Handler >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  res.render('editor2', { title: 'Editor2', lang: req.params.lang });
});


module.exports = router;
