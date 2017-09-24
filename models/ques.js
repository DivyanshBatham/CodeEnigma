var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quesSchema = new Schema({
  // difficulty: {type: String, required: true},
  difficulty: String,
  id: String,
  title: String,
  shortDescription: String,
  description: String,
  sampleInput: String,
  // sampleOutput: String
});

module.exports = mongoose.model('ques', quesSchema);
// mongoose.model('ques', quesSchema);
// ques is the collection name in the DB
// If we didn't set model equal to some variable then we will use mongoose.model('questions')
// Otherwise if we did then
// Question = mongoose.model('ques', quesSchema);
// Then we would do Question.find()
