var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Top");
  // res.redirect('/login');
  res.render('home', { title: 'Home', difficulty: 'easy'});
});

router.get('/:difficulty', function(req, res, next) {
  console.log("Middle");
  mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
    res.render('home', { questions:questions, difficulty:req.params.difficulty })
    //res.send(questions);
  });
});

router.get('/:difficulty/:id', function(req, res, next) {
  console.log("Middle - Bottom");
  mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
    res.render('editor2', { questions:questions , id:req.params.id ,lang: ""})
    //res.send(questions);
  });
});


router.get('/:difficulty/:id/:lang', function(req, res, next) {
  console.log("Bottom");
  mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
    res.render('editor2', { questions:questions , id:req.params.id ,lang: req.params.lang})
    //res.send(questions);
  });
});

module.exports = router;
