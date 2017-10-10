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
    ignoreLines : req.body.ignoreLines,
    inputLines : req.body.inputLines,
    outputLines : req.body.outputLines,
    sampleInput : req.body.sampleInput,
    sampleOutput : req.body.sampleOutput
  }

  // ignoreLines : From insert.js
  // inputLines : From insert.js
  // outputLines : From insert.js

// sampleInput : String
// sampleOutput : String
// inputs = [];   If saved in DB then it'll only be requred to calculate once.
// outputs = [];   If saved in DB then it'll only be requred to calculate once.

var matches = data.sampleInput.split('\n');
var inputs = [], outputs = [], testcase = [], t;
for( var i=data.ignoreLines; i<matches.length; )
{
  t = data.inputLines;
  testcase = [];
  while(t--)
  {
    testcase.push(matches[i]);
    i++;
  }
  inputs.push(testcase.join('\n'));
}
  outputs = data.sampleOutput.split('\n');

data.inputs = inputs;
data.outputs = outputs;

// hiddenInput : From insert.js
// hiddenOutput : From insert.js
// hiddenTestCases = [];   If saved in DB then it'll only be requred to calculate once.
// Calculare the array and save in db.

  console.log("Insert.js(Route)" , data);
  console.log(inputs);
  var data = new questions(data);
  data.save();

  res.redirect('CodeEnigma/');
  // res.redirect('CodeEnigma/'+data.difficulty+'/'+data.id);
  res.end();
  //res.send("Data Successfully Inserted");
});


module.exports = router;
