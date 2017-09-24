var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionsSchema = new Schema({
  difficulty: String,
  id: String,
  title: String,
  description: String,
  shortDescription: String,
  sampleInput: String
});

module.exports = mongoose.model('questions', questionsSchema);
