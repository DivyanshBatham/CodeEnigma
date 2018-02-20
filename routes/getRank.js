var express = require('express');
const mongoose = require('mongoose');
var users = require('../models/users');
var router = express.Router();

router.post('/', function(req, res, next) {

  // User.findOne({ email: req.body.email }, function(err, user) {
  // users.findOne( { id:req.body.TeamId, pass:req.body.Password } ,function(err,users){

  users.find({ type:"contestant" },function(err,u){
    let userList = [];
    // console.log(u);
    // console.log("INSIDE");
    u.forEach(function(user){
      userList.push({
        id : user.id,
        score : user.score,
        lastSubmission : user.lastSubmission
      });
    });
    userList = userList.sort(function(a,b){
      if(a.score != b.score)
      {
        return b.score - a.score; // DESC.
      }
      else
      {
          if(a.lastSubmission != b.lastSubmission)
              return a.lastSubmission - b.lastSubmission ; // ASC.
          else
          {
            if(a.Round2Score != b.Round2Score)
                return b.Round2Score - a.Round2Score; // DESC.
            else
            {
                if(a.Round2LastSubmission != b.Round2LastSubmission )
                      return a.Round2LastSubmission - b.Round2LastSubmission;
                else
                      return (a.id.match(/\d+/)[0]) - (b.id.match(/\d+/)[0]) ;

            }

          }
      }

    });

    // console.log("userList");
    // console.log(userList);
    // Extract id, score and lastSubmission.
    let result = {
      rank : `#${ 1 + userList.findIndex( x => x.id==req.user.id ) }/${userList.length}`,
      score : `(${req.user.score} Points)`
    }

    // `#${data}/147`s

    res.send(JSON.stringify( result ));
    // res.io.emit("update2",userList);
  });



    // res.json({rank : 17});


});


module.exports = router;
