var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionsSchema = new Schema({
  id: String,
  description: String,
  inputFormat: String,
  outputFormat: String,
  sampleInput: String,
  sampleOutput: String
});

mongoose.model('questions', questionsSchema);
