var express = require('express');
const mongoose = require('mongoose');
var questions = require('../models/questions');
var users = require('../models/users');
var router = express.Router();

function requireLogin (req, res, next) {
  if (!req.user) {
    console.log("REDIRECTED DUE TO requireLogin");
    res.redirect('/login');
  } else {
    next();
  }
};

/* GET home page. */
router.get('/', requireLogin, function(req, res, next) {
  console.log("Should redirect to CodeEnigma/easy");
  res.redirect('/CodeEnigma/easy');
  //res.render('home', { title: 'Home', difficulty: 'easy'});
});

/*
router.post('/:difficulty', function(req, res, next) {
  if(req.params.difficulty=='login')
  {

    // User.findOne({ email: req.body.email }, function(err, user) {
    // users.findOne( { id:req.body.TeamId, pass:req.body.Password } ,function(err,users){
    users.findOne( { id:req.body.TeamId } ,function(err,user){
      // console.log(req.body.TeamId,req.body.Password,user,user.pass);
    if (!user) {
      // console.log("Invalid TeamId");
      res.render('login.ejs', { error: 'Invalid TeamId.' });
    } else {
      if (req.body.Password === user.pass) {
        // console.log("Correct Login");
        // res.send(users);
        // sets a cookie with the user's info
        req.session.user = user;
        res.redirect('/CodeEnigma');
      } else {
        // console.log("Invalid TeamId or Password");
        res.render('login.ejs', { error: 'Invalid TeamId or Password.' });
      }
    }
  });


    //console.log(req.body.TeamId,req.body.Password);
    //    res.send(users);
    //  });
    //res.render('login', { title: 'Login' });
  }
});
*/

router.get('/:difficulty', requireLogin, function(req, res, next) {
  console.log("/:difficulty");
  //if(req.params.difficulty=='login')
  //    res.render('login', { title: 'Login', error: '' });

  if( ['easy','medium','hard','instructions'].indexOf(req.params.difficulty)!=-1 )
    // mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
    questions.find( { difficulty:req.params.difficulty } ,function(err,questions){
      res.render('home', { questions:questions, difficulty:req.params.difficulty })
    });
  else {
      // Give 404 Error.
      // No such page found.
      res.send("404 Error : No such difficulty/page found");
  }
});

// CHANGE find to findOne, for better efficiency or use AngularJS to reduce server load.
router.get('/:difficulty(easy|medium|hard)/:id', requireLogin, function(req, res, next) {
  console.log("/:id",req.params.lang);
  mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
    if(req.params.id.charCodeAt(0)-64 <= questions.length)
      res.render('editor2', { questions:questions , id:req.params.id ,lang: "",difficulty:req.params.difficulty})
    else {
      // Give 404 Error.
      // No such question found.
      res.send("404 Error"+" No such question found.");
    }
  });
});

router.get('/:difficulty(easy|medium|hard)/:id/:lang(c|cpp|java)', requireLogin, function(req, res, next) {
  // If helpful 404 error needed, then uncomment the following and remove regex for lang :
  // if(req.params.id.match(/c|cpp|java/)) {
  console.log("/:id/",req.params.lang);
        mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
          if(req.params.id.charCodeAt(0)-64 <= questions.length)
            res.render('editor2', { questions:questions , id:req.params.id ,lang: req.params.lang, difficulty:req.params.difficulty})
          else {
            // Give 404 Error.
            // No such question found.
            res.send("404 Error"+" No such question found.");
          }
        });
  // else {
  //      res.send(req.params.lang+" is not a valid language.");
  // }
});

module.exports = router;
