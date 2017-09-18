var express = require('express');
var router = express.Router();
var hackerRank = require('machinepack-hackerrank');

/* GET users listing. */
router.post('/', function(req, res, next) {
  	console.log("\n\n Got a request");
	//console.log(req.body.input);
 // 	var inputs = req.body.input.toString().split(/\W+/g);
 	var inputs = [req.body.input];
 	console.log(inputs);
hackerRank.submit({
	apiKey: 'hackerrank|515066-1831|aefbf1c26653c1454fb1b2ad4a383892cbce27e9',
	source: req.body.source,
	language: parseInt(req.body.langNo),
	testcases: inputs,
	// source: ``,
	// language: 2,
	// testcases: [""],
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
		console.log( inputs[0], " success");
 	//console.log(response)
	 res.json(response);
	},
	});


});

module.exports = router;
