var express = require('express');
var router = express.Router();
var hackerRank = require('machinepack-hackerrank');
var questions = require('../models/questions');

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
