module.exports = {


  friendlyName: 'Submit',


  description: 'Submit the source code for compilation',


  extendedDescription: '',


  inputs: {
    apiKey: {
      example: 'AAAAAAAAAAAAAA',
      description: 'Your HackerRank API Key',
      required: true
    },
    source: {
      example: 'using System;class MyClass{static void Main(string[] args) {System.Console.WriteLine(\"Hello World!\\n\");}}',
      description: 'source code, which needs to be compiled and run against the provided test cases.',
      required: true
    },
    language: {
      example: 9,
      description: 'The language key for the language, the submission is made in.Get lang key from http://api.hackerrank.com/checker/languages.json',
      required: true
    },
    testcases: {
      example: [],
      description: 'A valid JSON, which on parse should result in a list of strings.',
      required: true
    },
    wait: {
      example: true,
      description: 'if true , response will be sent after compilation and run.',
      required: false
    },
    callbackUrl: {
      example: 'http://example.com/callback',
      description: 'A callback url, on which the submission response will be posted as a JSON string under `data` parameter.',
      required: false
    },
    format: {
      example: 'json',
      description: 'must be either json or xml.',
      required: false
    }
  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    success: {
      description: 'Done.'
    }

  },


  fn: function (inputs, exits) {
    var querystring = require('querystring');
    var http = require('http');

    var data = querystring.stringify({
      api_key: inputs.apiKey,
      source: inputs.source,
      lang: inputs.language,
      testcases: JSON.stringify(inputs.testcases),
      wait: inputs.wait,
      callback_url: inputs.callbackUrl,
      format: inputs.format
    });

    var options = {
      hostname: 'api.hackerrank.com',
      port: 80,
      path: '/checker/submission.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
      }
    };
    var response = '';
    var req = http.request(options, function (res) {
      res.on('data', function (chunk) {
        response += chunk.toString();
      });
      res.on('end', function () {
        return exits.success(response.toString());
      });
      res.on('error', function (err) {
        return exits.error(err);
      });
    });
    req.on('error', function (err) {
      return exists.error(err);
    })
    req.write(data);
    req.end();
  },

};
