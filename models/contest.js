var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contestSchema = new Schema({
  startDate : String,
  endDate : String
});

// module.exports = mongoose.model('contest', contestSchema);
module.exports = mongoose.model('contest', contestSchema, 'contest');
// The third parameter forces the collection name to be the same as 3rd parameter, and not "contests" where Mongoose append an extra 's'
