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
  id: String,
  pass: String
});

mongoose.model('users', usersSchema);
