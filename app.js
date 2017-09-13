var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var fs = require('fs');


// Routes :
var home = require('./routes/home');
var users = require('./routes/users');
var editor = require('./routes/editor');
var editor2 = require('./routes/editor2');
var run = require('./routes/run');
var login = require('./routes/login');


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

// Connecting to MongoDB:
mongoose.connect('mongodb://localhost:27017/enigmadb');

// Models for Mongoose :
fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if(~filename.indexOf('.js'))
  require(__dirname + '/models/' + filename);
});

app.use('/', home);
app.use('/users', users);
app.use('/editor', editor);
app.use('/editor2', editor2);
app.use('/run', run);
app.use('/login', login);

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
