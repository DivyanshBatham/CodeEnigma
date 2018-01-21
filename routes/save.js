var express = require('express');
const mongoose = require('mongoose');
var users = require('../models/users');
// var mongodb = require('mongodb');
// var MongoClient = require('./../db.js');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log("Got a Save Request");

  let newsavedCodes = req.user.savedCodes;
  // If overwriting a save:
  if(newsavedCodes[req.body.difficulty].findIndex( q => q.id==req.body.id && q.language==req.body.language ) != -1 )
  {
    newsavedCodes[req.body.difficulty].find( q => q.id==req.body.id && q.language==req.body.language )['code'] = req.body.code;
  }
  else {
    newsavedCodes[req.body.difficulty].push( { id: req.body.id, language: req.body.language, code: req.body.code } );
  }

  users.findOne( { id: req.user.id } ,function(err,contest){
        let newData = { savedCodes : newsavedCodes };
        // console.log(newData);
        users.update( {id:req.user.id}, newData, function(err, numAffected){
          if(err)
          console.log(err);
          else
          console.log("CODE SAVED");

        });
  });
  res.json("Code Saved");
  // res.end();
});


module.exports = router;
