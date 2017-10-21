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


// Routes :
var home = require('./routes/home');
var CodeEnigma = require('./routes/CodeEnigma');
var users = require('./routes/users');
var editor = require('./routes/editor');
var editor2 = require('./routes/editor2');
var run = require('./routes/run');
var login = require('./routes/login');
var insert = require('./routes/insert');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
	activeDuration: 5 * 60 * 60 * 1000
}));

// Connecting to MongoDB:
mongoose.connect('mongodb://localhost:27017/enigmadb');

// Models for Mongoose :
var users = require('./models/users');
var questions = require('./models/questions');
var ques = require('./models/ques');
/*fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if(~filename.indexOf('.js'))
    require(__dirname + '/models/' + filename);
});*/


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

app.use(function(req, res, next) {
   if(req.url.substr(-1) == '/' && req.url.length > 1)
       res.redirect(301, req.url.slice(0, -1));
   else
       next();
});

// app.use('/', home);
app.get('/', function(req, res) {
  if (!req.user)
    res.redirect('/login');
  else
    res.redirect('/CodeEnigma');
});
app.use('/CodeEnigma', CodeEnigma);
// app.use('/users', users);
// app.use('/editor', editor);
// app.use('/editor2', editor2);
app.use('/run', run);
app.use('/insert', insert);
app.use('/login', login);
app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/login');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
