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
  pass: String
});

module.exports = mongoose.model('users', usersSchema);
