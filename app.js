var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var fs = require('fs');
var session = require('client-sessions');
var helmet = require('helmet');

var users = require('./models/users');

// Routes :
//var home = require('./routes/home');
//var CodeEnigma = require('./routes/CodeEnigma');
//var loader = require('./routes/loader');
// var editor = require('./routes/editor');
//var editor2 = require('./routes/editor2');
//var run = require('./routes/run');
//var login = require('./routes/login');
//var insert = require('./routes/insert');
//var update = require('./routes/update');
//var save = require('./routes/save');
//var defaultLanguage = require('./routes/defaultLanguage');
//var getRank = require('./routes/getRank');
//var getTime = require('./routes/getTime');
//var getCode = require('./routes/getCode');
//var config = require('./routes/config');

var app = express();
// Socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'Favicon.ico')));
app.use(helmet())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setting Up Session:
app.use(session({
	cookieName: 'session',
	secret: '%3RGSb.e-||Qd?$kF:IJf(8#2{(oIbaG&1w/J87T)d2_x;zQf^UIZeH%8VB/h,"A+)%)$>q}c1M"*hOlMA1LI^F%Zz%9D"[x',	// used for unique encryption and decryption
	duration: 30 * 60 * 60 * 1000, // Time after which session will expire (in milisecond), used for banking sites
	activeDuration: 5 * 60 * 60 * 1000,
	cookie: {
    // path: '/api', // cookie will only be sent to requests under '/api'
    // maxAge: 60000, // duration of the cookie in milliseconds, defaults to duration above
    ephemeral: true, // when true, cookie expires when the browser closes
    // httpOnly: true, // when true, cookie is not accessible from javascript
    // secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
  }
}));

// Connecting to MongoDB:
mongoose.connect('mongodb://localhost:27017/enigmadb');

// Models for Mongoose :
var users = require('./models/users');
var questions = require('./models/questions');
var contest = require('./models/contest');
/*fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if(~filename.indexOf('.js'))
    require(__dirname + '/models/' + filename);
});*/


// On connection to the socket:
io.on('connection',function(socket){
	console.log(`Made a socket connection.`,socket.id);
});


// Session Middleware : Checks and Refreshes the Session if needed.
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    users.findOne({ id: req.session.user.id }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.pass; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

// Add middleware for determining the rank, add to session?

// Socket Middleware (passing our socket to our response object) :
app.use(function(req, res, next){
  res.io = io;
  next();
});

// URL middleware :
app.use(function(req, res, next) {
   if(req.url.substr(-1) == '/' && req.url.length > 1)
       res.redirect(301, req.url.slice(0, -1));
   else
       next();
});

// Contest Not Yet Started Middleware: (Should I forcefully test whether the url is only a valid route, asking because of the requests for .js and .css)
app.use(function(req, res, next) {

	if(req.user)
  {
		contest.findOne( { } ,function(err,contest){
			// var countDownDate = new Date("Nov 3, 2018 21:09:00").getTime();
			var startDate = new Date(contest.startDate).getTime();
			var now = new Date().getTime();
			// Find the distance between now an the count down date
			var timeRemaining = startDate - now;

			if( req.user.type != 'admin' && timeRemaining >= 0 && req.url!='/CodeEnigma/instructions' && req.url!='/logout' && req.url!='/login'  && req.url!='/getRank' && req.url!='/getTime'  )
			{
				console.log("COMPETITION IS NOT STARTED THEREFORE REDIRECTED TO /CodeEnigma/instructions (Due to Middleware)");
				res.redirect('/CodeEnigma/instructions');
			}
			else
			   next();
		});
	}
	else {
		next();
	}
});


// Contest Running Middleware for results : (Should I forcefully test whether the url is only a valid route, asking because of the requests for .js and .css)
app.use(function(req, res, next) {

	if(req.user)
  {
		contest.findOne( { } ,function(err,contest){
			// var countDownDate = new Date("Nov 3, 2018 21:09:00").getTime();
			var endDate = new Date(contest.endDate).getTime();
			var now = new Date().getTime();
			// Find the distance between now an the count down date
			var timeRemaining = endDate - now;

			if( req.user.type != 'admin' && timeRemaining >= 0 && req.url=='/CodeEnigma/results' )
			{
				console.log("COMPETITION IS RUNNING THEREFORE REDIRECTED TO /CodeEnigma/easy SINCE USER CANNOT CHECK THE RESULTS YET");
				res.redirect('/CodeEnigma/easy');
			}
			else
			   next();
		});
	}
	else {
		next();
	}
});


// Contest Ended Middleware : (Should I forcefully test whether the url is only a valid route, asking because of the requests for .js and .css)
app.use(function(req, res, next) {

	// if (req.session && req.session.user) {
	if(req.user)
  {
		contest.findOne( { } ,function(err,contest){
			// var countDownDate = new Date("Nov 3, 2018 21:09:00").getTime();
			var endDate = new Date(contest.endDate).getTime();
			var now = new Date().getTime();
			// Find the distance between now an the count down date
			var timeRemaining = endDate - now;
			if( req.user.type != 'admin' && timeRemaining < 0 && req.url!='/CodeEnigma/results' && req.url!='/logout' && req.url!='/login' && req.url!='/getRank' && req.url!='/getTime' )
			// if( timeRemaining < 1 && req.url!='/CodeEnigma/results' && req.url!='/logout' && req.url!='/login' && req.url!='/config' )
			{
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>> REQ.URL "+req.url+" <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
				console.log("COMPETITION IS ENDED THEREFORE REDIRECTED TO /CodeEnigma/results");
				res.redirect('/CodeEnigma/results');
			}
			else
			   next();
		});
	}
	else {
		next();
	}
});


// app.use('/', home);
/*app.get('/', function(req, res) {
  if (!req.user)
    res.redirect('/login');
  else
    res.redirect('/CodeEnigma');
});
app.use('/CodeEnigma', CodeEnigma);
app.use('/users', users);
// app.use('/editor', editor);
// app.use('/editor2', editor2);
app.use('/run', run);
app.use('/save', save);
app.use('/defaultLanguage', defaultLanguage);
app.use('/insert', insert);
app.use('/update', update);
app.use('/login', login);
app.use('/getRank', getRank);
app.use('/getTime', getTime);
app.use('/getCode', getCode);
app.use('/config', config);
app.use('/loader', loader);
*/
/*
app.get(//, function(req, res) {
  //req.session.reset();
  res.redirect('/EasyRoundResults');
});
*/


app.get('/EasyRoundResults', function(req,res) {
	users.find( { type : "contestant" } ,function(err,users){
		users = users.sort(function(a,b){
			if(a.score != b.score)
			{
				return b.score - a.score;
			}
			else
				if(a.score == b.score)
				{
						if(a.lastSubmission != b.lastSubmission)
							return a.lastSubmission - b.lastSubmission ;
						else
							return (a.id.match(/\d+/)[0]) - (b.id.match(/\d+/)[0]) ;
				}
		});
		res.render('results2', { users:users });
	});
});

app.get('/EasyRoundResults', function(req,res) {
	users.find( { type : "contestant" } ,function(err,users){
		users = users.sort(function(a,b){
			if(a.score != b.score)
			{
				return b.score - a.score;
			}
			else
				if(a.score == b.score)
				{
						if(a.lastSubmission != b.lastSubmission)
							return a.lastSubmission - b.lastSubmission ;
						else
							return (a.id.match(/\d+/)[0]) - (b.id.match(/\d+/)[0]) ;
				}
		});
		res.render('results2', { users:users });
	});
});

// app.get('/graph.png', function (req, res) {
//     res.sendfile(path.resolve('./public/graph.png'));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
<<<<<<< HEAD
  res.redirect('/EasyRoundResults');
//var err = new Error('Not Found');
 // err.status = 404;
 // next(err);
=======

  var err = new Error('Not Found');
  err.status = 404;
  next(err);
>>>>>>> ab43d4d00231221a0cc5e6ed4ece2b863336a9e2
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
module.exports = {app: app, server: server};
