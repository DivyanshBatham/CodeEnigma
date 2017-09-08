var express = require('express');
var mongodb = require('mongodb');
// var MongoClient = require('./../db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/enigmadb';
  MongoClient.connect(url,function(err,db){
  	if(err)
  		console.log('Unable to connect to mongodb', err);
  	else
  	{
  		console.log('connection established');

  		var users = db.collection('users');
  		users.find({}).toArray(function(err,result){
  			if(err)
  				res.send(err);
  			else if(result.length)
  				console.log(result);
  		})
  	}
  })

  res.render('login', { title: 'Login' });
});


module.exports = router;
