var express = require('express');
const mongoose = require('mongoose');
var ques = require('../models/ques');
var questions = require('../models/questions');
// var mongodb = require('mongodb');
// var MongoClient = require('./../db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('insert', { title: 'Insert' });
});

router.post('/', function(req, res, next) {
  // console.log(req.body.TeamId,req.body.Password);
  console.log("Got a request");
  // var data = {
  //   title : req.body.difficulty,
  //   description : req.body.description
  // }
  //
  // console.log(data);
  // var data = new ques(data);
  // data.save();


  var data = {
    difficulty : req.body.difficulty,
    id : req.body.id,
    title: req.body.title,
    description : req.body.description,
    shortDescription : req.body.shortDescription,
    sampleInput : req.body.sampleInput
  }

  console.log(data);
  var data = new questions(data);
  data.save();

  res.redirect('CodeEnigma/');
  // res.redirect('CodeEnigma/'+data.difficulty+'/'+data.id);
  res.end();
  //res.send("Data Successfully Inserted");
});


module.exports = router;
