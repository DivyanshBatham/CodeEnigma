var express = require('express');
const mongoose = require('mongoose');
var users = require('../models/users');
// var mongodb = require('mongodb');
// var MongoClient = require('./../db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    console.log("REDIRECTED BECAUSE ALREADY LOGGED IN");
    res.redirect('/CodeEnigma');
  }
  else
    res.render('login', { title: 'Login', error: '' });
});

router.post('/', function(req, res, next) {

  // User.findOne({ email: req.body.email }, function(err, user) {
  // users.findOne( { id:req.body.TeamId, pass:req.body.Password } ,function(err,users){
  users.findOne( { id:req.body.TeamId } ,function(err,user){
    console.log(req.body.TeamId,req.body.Password,user,user.pass);
  if (!user) {
    console.log("Invalid TeamId");
    res.render('login.ejs', { error: 'Invalid TeamId.' });
  } else {
    if (req.body.Password === user.pass) {
      console.log("Correct Login");
      // res.send(users);
      // sets a cookie with the user's info
      req.session.user = user;
      res.redirect('/CodeEnigma');
    } else {
      console.log("Invalid TeamId or Password");
      res.render('login.ejs', { error: 'Invalid TeamId or Password.' });
    }
  }
  });

});


module.exports = router;
