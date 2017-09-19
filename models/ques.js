var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quesSchema = new Schema({
  difficulty: String,
  id: String,
  title: String,
  description: String,
  sampleInput: String,
  sampleOutput: String
});

mongoose.model('ques', quesSchema);
