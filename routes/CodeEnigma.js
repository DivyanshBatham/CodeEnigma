var express = require('express');
const mongoose = require('mongoose');
var questions = require('../models/questions');
var users = require('../models/users');
var contest = require('../models/contest');
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
  console.log(req.params.difficulty);
  //if(req.params.difficulty=='login')
  //    res.render('login', { title: 'Login', error: '' });

  if( ['easy','medium','hard'].indexOf(req.params.difficulty)!=-1 )
    // mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
    questions.find( { difficulty:req.params.difficulty } ,function(err,questions){
      res.render('home', { questions:questions.sort( (q1,q2) => q1.id.localeCompare(q2.id) ), difficulty:req.params.difficulty })
    });
  else if( 'instructions' == req.params.difficulty )
  {
      res.render('instructions', { title: 'Configuration'});
  }
  else if( 'results' == req.params.difficulty )
  {
        // contest.findOne( { } ,function(err,contest){
          // var startDate = new Date(contest.startDate).getTime();

              users.find( { type : "contestant" } ,function(err,users){
                users = users.sort(function(a,b){
                  if(a.score != b.score)
                  {
                    return b.score - a.score;
                  }
                  else
                    if(a.score == b.score)
                    {
                        if(a.lastSubmission != b.lastSubmission)
                          return a.lastSubmission - b.lastSubmission ;
                        else
                          return (a.id.match(/\d+/)[0]) - (b.id.match(/\d+/)[0]) ;
                    }
                });
                res.render('results', { users:users });
              });
      // });
  }
  else {
      // Give 404 Error.
      // No such page found.
      res.send("404 Error : No such difficulty/page found");
  }
});

// CHANGE find to findOne, for better efficiency or use AngularJS to reduce server load.
// router.get('/:difficulty(easy|medium|hard)/:id', requireLogin, function(req, res, next) {
//   console.log("/:id",req.params.lang);
//   mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
//     if(req.params.id.charCodeAt(0)-64 <= questions.length)
//     {
//       var index = questions.findIndex( q => q.id == req.params.id );
//       res.render('editor2', { questions:questions ,index:index, id:req.params.id ,lang: "",difficulty:req.params.difficulty})
//     }
//     else {
//       // Give 404 Error.
//       // No such question found.
//       res.send("404 Error"+" No such question found.");
//     }
//   });
// });

router.get('/:difficulty(easy|medium|hard)/:id/:lang(c|cpp|java|python2|python3)', requireLogin, function(req, res, next) {
  // If helpful 404 error needed, then uncomment the following and remove regex for lang :
  // if(req.params.id.match(/c|cpp|java/)) {
  console.log("/:id/",req.params.lang);
        mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
          var questions = questions.sort((q1,q2) => q1.id.localeCompare(q2.id));
          var index = questions.findIndex( q => q.id == req.params.id );
          if( index != -1 )
          {
            res.render('editor2', { questions:questions, index:index, id:req.params.id ,lang: req.params.lang, difficulty:req.params.difficulty})
          }
          else {
            // Give 404 Error.
            // No such question found.
            res.send("404 Error"+" No such question found.");
          }
        });

});

module.exports = router;
