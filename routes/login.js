var express = require('express');
const mongoose = require('mongoose');
var users = require('../models/users');
// var mongodb = require('mongodb');
// var MongoClient = require('./../db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    // console.log("REDIRECTED BECAUSE ALREADY LOGGED IN");
    res.redirect('/CodeEnigma');
  }
  else
    res.render('login2', { title: 'Login' });
});

router.post('/', function(req, res, next) {

  // User.findOne({ email: req.body.email }, function(err, user) {
  // users.findOne( { id:req.body.TeamId, pass:req.body.Password } ,function(err,users){
  users.findOne( { id:req.body.TeamId } ,function(err,user){
  if (!user) {
    // console.log("Invalid TeamId");
    res.send({ status : "Invalid TeamId" });
  } else {
    // console.log(req.body.TeamId,req.body.Password,user,user.pass);
    if (req.body.Password === user.pass) {
      // console.log("Correct Login");
      req.session.user = user;
      res.send({ status : "Correct Login" });
    } else {
      // console.log("Invalid TeamId or Password");
      res.send({ status : "Invalid TeamId or Password" });
    }
  }
  });

});


module.exports = router;
