var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/enigmadb';

MongoClient.connect(url,function(err,db){
	if(err)
		console.log('Unable to connect to mongodb', err);
	else
		console.log('Connection established');
}

module.exports = MongoClient;