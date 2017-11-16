var express = require('express');
const mongoose = require('mongoose');
// var questions = require('../models/questions');
var contest = require('../models/contest');
var users = require('../models/users');
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
router.get('/', requireAdmin,function(req, res, next) {

  contest.findOne( { } ,function(err,contest){
    // console.log(contest);
    let end = new Date(contest.endDate).getTime();
    let start = new Date(contest.startDate).getTime();
    let duration = end - start;
    var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((duration % (1000 * 60)) / 1000);

    duration = hours + "H " + minutes + "M " + seconds + "S ";

    // console.log(end,start,duration);
    res.render('config', { title: 'Configuration', contest: contest, duration: duration  });
    // res.render('home', { questions:questions, difficulty:req.params.difficulty })
  });
});

router.post('/', function(req, res, next) {
  console.log("Got a request in Route");

if(req.body.type =="Contest")
{
  var newData = {
    startDate : req.body.startDate,
    endDate : req.body.endDate
  }
  console.log(newData);

  contest.update( {}, newData, function(err, numAffected){
    if(err)
    console.log(err);
    else
    {
      console.log("DATA UPDATED",numAffected);
      res.send(JSON.stringify( numAffected ));
    }

  });
}
else if(req.body.type =="Contestant")
{
  for( var i = req.body.startId; i<=req.body.endId; i++ )
  {

    var newData = {
      id: ("CE"+("000"+i).slice(-3)),
      type: "contestant",
      pass: "12345",
      score : 0,
      solvedQuestions : {
        easy : [],
        medium : [],
        hard : []
      },
      lastSubmission : 0
    };

    console.log(newData);
    var data = new users(newdata);
    data.save();
  }
  res.send();
  // res.end();
}

  // var data = new contest(newData);
  // data.save();

  // res.send(JSON.stringify( timeRemaining ));
  // res.send();
  // res.redirect('/CodeEnigma/results');
  // res.redirect('CodeEnigma/');

  // res.end();
  //res.send("Data Successfully Inserted");
});


module.exports = router;
