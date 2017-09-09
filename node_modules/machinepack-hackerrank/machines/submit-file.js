module.exports = {


  friendlyName: 'Submit file',


  description: 'Submit a source code file for compilation',


  extendedDescription: '',


  inputs: {
    apiKey : {
      example : 'AAAAAAAAAAAAAA' ,
      description : 'Your HackerRank API Key' ,
      required : true 
    } ,
    filePath : {
      example : 'E:\\Source.cs' ,
      description : 'File path for the source code file' ,
      required : true 
    } ,
    language : {
      example : 9 ,
      description : 'The language key for the language, the submission is made in.Get lang key from http://api.hackerrank.com/checker/languages.json' ,
      required : true       
    } ,
    testcases : {
      example : [],
      description : 'A valid JSON, which on parse should result in a list of strings.' ,
      required : true              
    } ,
    wait : {
      example : true ,
      description : 'if true , response will be sent after compilation and run.' ,
      required : false 
    } ,
    callbackUrl : {
      example : 'http://example.com/callback' ,
      description : 'A callback url, on which the submission response will be posted as a JSON string under `data` parameter.',
      required : false 
    } ,
    format : {
      example : 'json' ,
      description : 'must be either json or xml.' ,
      required : false 
    }
  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    success: {
      description: 'Done.'
    },

  },


  fn: function (inputs,exits) {
    var fs = require('fs');

    fs.readFile(inputs.filePath , { encoding : 'utf8'} , function(err , data ){
      if(err)
        return exits.error(err);
      else 
      {
        var submit = require("machine").build(require('./submit'));
        submit({
          apiKey : inputs.apiKey ,
          source : data ,
          language : inputs.language ,
          testcases : inputs.testcases , 
          wait : inputs.wait ,
          callbackUrl : inputs.callbackUrl ,
          format : inputs.format
        }).exec({
          error : function(err){
            return exits.error(err);
          } ,
          success : function(result){
            return exits.success(result);
          }
        })
      }
    });
  },



};
