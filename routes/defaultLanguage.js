var express = require('express');
const mongoose = require('mongoose');
var users = require('../models/users');
// var mongodb = require('mongodb');
// var MongoClient = require('./../db.js');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log("Got a Default Language Change Request");

  users.findOne( { id: req.user.id } ,function(err,contest){
        let newData = { defaultLanguage : req.body.defaultLanguage };
        // console.log(newData);
        users.update( {id:req.user.id}, newData, function(err, numAffected){
          if(err)
          console.log(err);
          else
          console.log("DEFAULT LANGUAGE CHANGED");

        });
  });
  res.json({ defaultLanguage : req.body.defaultLanguage });
  // res.end();
});


module.exports = router;
