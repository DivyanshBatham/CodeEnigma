var express = require('express');
var router = express.Router();
var hackerRank = require('machinepack-hackerrank');
var questions = require('../models/questions');
var users = require('../models/users');
var contest = require('../models/contest');

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
              customResponse.status = "✓ Correct Answer";
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
    if( req.user.solvedQuestions[req.body.difficulty].indexOf(req.body.id) != -1 )
    {
      var customResponse = { status : "Duplicate Submission" };
      // customResponse.status = "Compilation Error";
      res.json(customResponse);
    }
    else
    {
      // console.log("ELSE OF DUPLICATE");
      questions.findOne( { difficulty:req.body.difficulty, id:req.body.id } ,function(err,question){
        console.log(question);
        var inputs = [question.hiddenInput];
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
            // customResponse.sampleInput = inputs;
            // customResponse.sampleOutput = question.sampleOutput;
            if( customResponse.result.compilemessage != "" )
            customResponse.status = "Compilation Error";
            else if( customResponse.result.stdout[0] != question.hiddenOutput )
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


              contest.findOne( { } ,function(err,contest){

                    var startDate = new Date(contest.startDate).getTime();
                    var time = Date.now() - startDate;

                    var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((time % (1000 * 60)) / 1000);

                    var lastSubmissionDisplay = hours + "H " + minutes + "M " + seconds + "S";

                    let newData = {
                      score : newScore,
                      solvedQuestions : newSolvedQuestions,
                      lastSubmissionDisplay : lastSubmissionDisplay,
                      lastSubmission : time
                    };

                    console.log(newData);
                    users.update( {id:req.user.id}, newData, function(err, numAffected){
                      if(err)
                      console.log(err);
                      else
                      console.log("DATA UPDATED");

                    });

                    // Make Everyone to Request new rank.
                    res.io.emit("update2");
            });

            } // Correct Answer.

            // console.log(response);
            console.log(customResponse);
            console.log( inputs[0], " success");
            //console.log(response)
            res.json(customResponse);
            },
          });

        });
    }
} // Submit


}); // Route

module.exports = router;
