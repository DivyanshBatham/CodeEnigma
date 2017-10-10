var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionsSchema = new Schema({
  difficulty: String,
  id: String,
  title: String,
  description: String,
  shortDescription: String,
  ignoreLines : Number,
  inputLines : Number,
  outputLines : Number,
  sampleInput: String,
  sampleOutput : String,
  inputs : Array,
  outputs : Array
});

module.exports = mongoose.model('questions', questionsSchema);
