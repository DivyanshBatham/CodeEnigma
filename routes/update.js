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

// function comparision(q1,q2) {
//   if
// }

/* GET home page. */
router.get('/:difficulty(easy|medium|hard)/:id/', requireAdmin, function(req, res, next) {
  questions.findOne( {id:req.params.id, difficulty:req.params.difficulty } ,function(err,question){
    // res.send(questions);
    console.log(question);
    res.render('update', { title: 'Update', question: question });
    //res.render('insert', { questions:questions.sort( (q1,q2) => ( q1.difficulty!=q2.difficulty? q1.difficulty.localeCompare(q2.difficulty) : q1.id.localeCompare(q2.id)) ) })
  });
});

router.post('/', function(req, res, next) {
  // console.log(req.body.TeamId,req.body.Password);
  console.log("Got a update request");

  let newData = {
    difficulty : req.body.difficulty,
    id : req.body.id,
    title: req.body.title,
    description : req.body.description,
    shortDescription : req.body.shortDescription,
    sampleInput : req.body.sampleInput,
    sampleOutput : req.body.sampleOutput,
    hiddenInput : req.body.hiddenInput,
    hiddenOutput : req.body.hiddenOutput
  };

  // console.log(newData);
  questions.update( {id:req.body.oldId, difficulty:req.body.oldDifficulty}, newData, function(err, numAffected){
    if(err)
      console.log(err);
    else
    {
      console.log("QUESTION UPDATED");
      res.json("Data Updated");
    }

  });


});


module.exports = router;
