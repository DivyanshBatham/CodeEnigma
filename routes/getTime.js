var express = require('express');
const mongoose = require('mongoose');
var contest = require('../models/contest');
var router = express.Router();

router.post('/', function(req, res, next) {

    contest.findOne( { } ,function(err,contest){
      // var countDownDate = new Date("Nov 3, 2018 21:09:00").getTime();
      var endDate = new Date(contest.endDate).getTime();
      var startDate = new Date(contest.startDate).getTime();

      var now = new Date().getTime();
      var timeRemaining, status;

      if( now < startDate ) // Competition not yet started.
      {
        timeRemaining = startDate - now;
        status = "starting";
      }
      else if( startDate < now && now < endDate ) // Competition is running.
      {
        timeRemaining = endDate - now;
        status = "running";
      }
      else // Competition has ended.
      {
        timeRemaining = 0;
        status = "ended";
      }

      // timeRemaining = endDate - now;
      // Find the distance between now an the count down date
      var Time = {
        timeRemaining : timeRemaining,
        userType : req.user.type,
        status : status
      }
      res.send(JSON.stringify( Time ));
    });
});


module.exports = router;
