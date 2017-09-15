var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Should redirect to CodeEnigma/easy");
  res.redirect('/CodeEnigma/easy');
  //res.render('home', { title: 'Home', difficulty: 'easy'});
});

router.get('/:difficulty', function(req, res, next) {
  console.log("/:difficulty");
  if(req.params.difficulty=='login')
      res.render('login', { title: 'Login' });
  else if( ['easy','medium','hard','instructions'].indexOf(req.params.difficulty)!=-1 )
    mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
      res.render('home', { questions:questions, difficulty:req.params.difficulty })
    });
  else {
      // Give 404 Error.
      // No such page found.
      res.send("404 Error : No such difficulty/page found");
  }
});

router.get('/:difficulty(easy|medium|hard)/:id', function(req, res, next) {
  console.log(req.params.lang);
  mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
    if(req.params.id.charCodeAt(0)-64 <= questions.length)
      res.render('editor2', { questions:questions , id:req.params.id ,lang: ""})
    else {
      // Give 404 Error.
      // No such question found.
      res.send("404 Error"+" No such question found.");
    }
  });
});

router.get('/:difficulty(easy|medium|hard)/:id/:lang(c|cpp|java)', function(req, res, next) {
  // If helpful 404 error needed, then uncomment the following and remove regex for lang :
  // if(req.params.id.match(/c|cpp|java/)) {
  console.log(req.params.lang);
        mongoose.model('questions').find( { difficulty:req.params.difficulty } ,function(err,questions){
          if(req.params.id.charCodeAt(0)-64 <= questions.length)
            res.render('editor2', { questions:questions , id:req.params.id ,lang: req.params.lang})
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

//router.get('/easy', function(req, res, next) {
// router.get('/easy', function(req, res, next) {
//   console.log("/easy");
//   mongoose.model('questions').find( { difficulty:'easy' } ,function(err,questions){
//     res.render('home', { questions:questions, difficulty:'easy' })
//   });
// });
//
// router.get('/easy/:id', function(req, res, next) {
//   console.log("/easy/:id");
//   mongoose.model('questions').find( { difficulty:'easy' } ,function(err,questions){
//     res.render('editor2', { questions:questions , id:req.params.id ,lang: ""})
//   });
// });
//
//
//router.get('/medium', function(req, res, next) {
//router.get('/hard', function(req, res, next) {
//router.get('/instructions', function(req, res, next) {
//router.get('/results', function(req, res, next) {

//router.get('/:username(\\w+)', this is regular expression.

//router.use('/login', login)

module.exports = router;
