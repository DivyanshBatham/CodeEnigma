// mongoose.model('user', {
//   Tid : String,
//   pass : String
// });
//
// mongoose.model('users').find(function(err,users){
//
// });

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  // Teamid: String,
  id: String,
  type: String,
  pass: String,
  code: String,
  score : Number,
  defaultLanguage : String,
  solvedQuestions : {
    easy : [String],
    medium : [String],
    hard : [String]
  },
  savedCodes : {
    easy : [{ id: String, language: String, code: String }],
    medium : [{ id: String, language: String, code: String }],
    hard : [{ id: String, language: String, code: String }]
  },
  lastSubmissionDisplay : String,
  lastSubmission : Number
  // lastSubmission : Number


  // lastSubmission : { type : Date, default: Date.now }
  /*
  // Keeping record of solved questions.
    solvedQuestions = { easy : [], medium : [], hard : [] };
        Access will be like solvedQuestions['<%= difficulty %>'];
        Further more like solvedQuestions['<%= difficulty %>'].indexOf('<%= id %>');
        Further more like solvedQuestions['<%= difficulty %>'].push('<%= id %>');

  // No need ?
    defaultLanguage : String   ?
    submissionTime = { easy : [], medium : [], hard : [] }; future implementations

  // For Sorting :
    lastSubmission = time // let's keep things simple for now.
    score : int

  */
  // solvedQuestions = {
  //   easy : [{ id : string, time : date }],
  //   medium : [{ id : string, time : date }],
  //   hard : [{ id : string, time : date }]
  // }
});

module.exports = mongoose.model('users', usersSchema);
