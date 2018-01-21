var express = require('express');
const mongoose = require('mongoose');
var users = require('../models/users');
var router = express.Router();

router.post('/', function(req, res, next) {

  users.findOne( { id:req.body.id } ,function(err,user){
  if (!user) {
    // console.log("Invalid TeamId");
    var result = {
      status : "404"
    }
    res.send(result);
  }
  else {
    var result = {
      status : "200",
      // code : user.code
      id : user.id,
      code : user.code
    }
    // console.log(result);
    res.send(result);
  }
  });

    // res.json({rank : 17});


});


module.exports = router;
