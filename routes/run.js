var express = require('express');
var router = express.Router();
var hackerRank = require('machinepack-hackerrank');
var questions = require('../models/questions');
var users = require('../models/users');

/* GET users listing. */
router.post('/', function(req, res, next) {
  	console.log("\n\n Got a request");
	//console.log(req.body.input);

  if(req.body.requestType=="custom")
  {
    var inputs = [req.body.input];
    hackerRank.submit({
    	apiKey: 'hackerrank|515066-1831|aefbf1c26653c1454fb1b2ad4a383892cbce27e9',
    	source: req.body.source,
    	language: parseInt(req.body.langNo),
    	testcases: inputs,
    	wait: true,
    	callbackUrl: '',
    	format: 'json',
    	}).exec({
    // An unexpected error occurred.
    	error: function (err) {
    		console.log("Err");
    		throw err;
    	},
    // OK.
    	success: function (response) {
        var customResponse = JSON.parse(response);
        if( customResponse.result.compilemessage != "" )
            customResponse.status = "Compilation Error";
        else
          customResponse.status = "Successful Compilation";
    		console.log( inputs[0], " success");
     	//console.log(response)
    	 res.json(customResponse);
    	},
    });
  }



  if(req.body.requestType=="run")
  {
      // Querry the DB for sampleInput
      questions.findOne( { difficulty:req.body.difficulty, id:req.body.id } ,function(err,question){
        console.log(question);
        var inputs = [question.sampleInput];
        hackerRank.submit({
        	apiKey: 'hackerrank|515066-1831|aefbf1c26653c1454fb1b2ad4a383892cbce27e9',
        	source: req.body.source,
        	language: parseInt(req.body.langNo),
        	testcases: inputs,
        	wait: true,
        	callbackUrl: '',
        	format: 'json',
        	}).exec({
        // An unexpected error occurred.
        	error: function (err) {
        		console.log("Err");
        		throw err;
        	},
        // OK.
        	success: function (response) {
            // Add inputs to the response.
            var customResponse = JSON.parse(response);
            customResponse.sampleInput = inputs;
            customResponse.sampleOutput = question.sampleOutput;
            if( customResponse.result.compilemessage != "" )
                customResponse.status = "Compilation Error";
            else if( customResponse.result.stdout[0] != question.sampleOutput )
              customResponse.status = "✘ Wrong Answer";
            else
            {
              customResponse.status = "✔ Correct Answer";
              // Change the score and save to DB and a whole lot of stuffs.
              // For SUBMIT
            }

            // console.log(response);
            console.log(customResponse);
        		console.log( inputs[0], " success");
         	//console.log(response)
        	 res.json(customResponse);
        	},
        });

      });
        // hackerRank Code
      // Should return testStatus true or false.
  }
  if(req.body.requestType=="submit")
  {
    //  CHECK WHETHER ALREADY SUBMITTED.

    // TESTING SOCKET:
    // res.io.emit("update","data");


// CODE FROM RUN:
// Querry the DB for sampleInput
questions.findOne( { difficulty:req.body.difficulty, id:req.body.id } ,function(err,question){
  console.log(question);
  var inputs = [question.sampleInput];
  hackerRank.submit({
    apiKey: 'hackerrank|515066-1831|aefbf1c26653c1454fb1b2ad4a383892cbce27e9',
    source: req.body.source,
    language: parseInt(req.body.langNo),
    testcases: inputs,
    wait: true,
    callbackUrl: '',
    format: 'json',
    }).exec({
  // An unexpected error occurred.
    error: function (err) {
      console.log("Err");
      throw err;
    },
  // OK.
    success: function (response) {
      // Add inputs to the response.
      var customResponse = JSON.parse(response);
      customResponse.sampleInput = inputs;
      customResponse.sampleOutput = question.sampleOutput;
      if( customResponse.result.compilemessage != "" )
          customResponse.status = "Compilation Error";
      else if( customResponse.result.stdout[0] != question.sampleOutput )
        customResponse.status = "✘ Wrong Answer";
      else
      {
        customResponse.status = "✔ Correct Answer";


        // Query using id from session.
        // Model.update(conditions, update, options, callback);

        //    Increase Score.
        let newScore = req.user.score;
        if(req.body.difficulty=='easy')  newScore += 5;
        if(req.body.difficulty=='medium')  newScore += 15;
        if(req.body.difficulty=='hard')  newScore += 25;

        //    Add question id to list.
        let newSolvedQuestions = req.user.solvedQuestions;
        newSolvedQuestions[req.body.difficulty].push(req.body.id);

        let newData = {
          score : newScore,
          solvedQuestions : newSolvedQuestions,
          lastSubmission : Date.now()
        };
        console.log(newData);
        users.update( {id:req.user.id}, newData, function(err, numAffected){
          if(err)
            console.log(err);
          else
            console.log("DATA UPDATED");

        });
        // Emit new rank data (Scores and rank) for particular user.

        // Emit sorted list of users to all users.
        users.find({},function(err,u){
          let userList = [];
          console.log(u);
          console.log("INSIDE");
          u.forEach(function(user){
            userList.push({
              id : user.id,
              score : user.score,
              lastSubmission : user.lastSubmission
            });
          });
          userList.sort(function(a,b){
            if(a.score < b.score) return -1;
            else if(a.score == b.score && a.lastSubmission < b.lastSubmission) return -1;
            else if(a.score > b.score) return 1;
            else return 0;
          });

          // console.log("userList");
          console.log(userList);
          // Extract id, score and lastSubmission.
          res.io.emit("update2",userList);
        });

        // var randomRank = Math.floor(Math.random()*147)+1;
        // res.io.emit("update",randomRank);

      }
      // console.log(response);
      console.log(customResponse);
      console.log( inputs[0], " success");
    //console.log(response)
     res.json(customResponse);
    },
  });

});
  // hackerRank Code
// Should return testStatus true or false.




// CODE FROM RUN:

    // Querry the DB for hiddenInput
      // hackerRank Code
    // Should return testStatus true or false.
    // Need of WebSockets
  }


//
//  	var inputs = [req.body.input];
//  	console.log(inputs);
// hackerRank.submit({
// 	apiKey: 'hackerrank|515066-1831|aefbf1c26653c1454fb1b2ad4a383892cbce27e9',
// 	source: req.body.source,
// 	language: parseInt(req.body.langNo),
// 	testcases: inputs,
// 	// source: ``,
// 	// language: 2,
// 	// testcases: [""],
// 	wait: true,
// 	callbackUrl: '',
// 	format: 'json',
// 	}).exec({
// // An unexpected error occurred.
// 	error: function (err) {
// 		console.log("Err");
// 		throw err;
// 	},
// // OK.
// 	success: function (response) {
// 		console.log( inputs[0], " success");
//  	//console.log(response)
// 	 res.json(response);
// 	},
// 	});
//
//
});

module.exports = router;
