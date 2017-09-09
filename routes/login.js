var express = require('express');
const mongoose = require('mongoose');
// var mongodb = require('mongodb');
// var MongoClient = require('./../db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
  console.log(req.body.TeamId,req.body.Password);
  mongoose.model('users').findOne( { id:req.body.TeamId, pass:req.body.Password } ,function(err,users){
    res.send(users);
  });

  //res.render('login', { title: 'Login' });
});


module.exports = router;
