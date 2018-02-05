var express = require('express');
const mongoose = require('mongoose');
var questions = require('../models/questions');
// var mongodb = require('mongodb');
// var MongoClient = require('./../db.js');
var router = express.Router();

function requireAdmin(req, res, next) {
  if(req.user)
  {
    if (req.user.type!='admin') {
      // Let users know they are not welcomed back here :P
      console.log("REDIRECTED DUE TO requireAdmin");
      console.log("USER IS NOT WELCOMED HERE");
      res.redirect('/CodeEnigma/easy');
    } else {
      next();
    }
  }
  else {
    res.redirect('/login');
  }
};

/* GET home page. */
router.get('/', requireAdmin, function(req, res, next) {
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
    // ignoreLines : req.body.outputLines,
    sampleInput : req.body.sampleInput,
    sampleOutput : req.body.sampleOutput,
    hiddenInput : req.body.hiddenInput,
    hiddenOutput : req.body.hiddenOutput
  }

// hiddenInput : From insert.js
// hiddenOutput : From insert.js

  console.log("Insert.js(Route)" , data);
  var data = new questions(data);
  data.save();

  // res.redirect('CodeEnigma/');
  // res.redirect('CodeEnigma/'+data.difficulty+'/'+data.id);
  // res.end();
  res.json("Data Updated");
  //res.send("Data Successfully Inserted");
});


module.exports = router;
