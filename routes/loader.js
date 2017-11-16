var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // mongoose.model('users').find(function(err,users){
  //   res.send(users);
  // });
  res.render('loader',{});
});

module.exports = router;
