var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var routes = require('./routes/create');
var users = require('./routes/live');

var APP_ID = 7740523506827330;
var APP_SECRET = "l6l8QHRBUVJyn+1NqjZq7p4uERt+gTc17a7KA6fIV/tNwfTjxkrGTfc3np909WnDCwoQ4Y4p90Q69vWRcOv2fg==";

global.APP_ID = APP_ID;
global.APP_SECRET = APP_SECRET;

var pg = require('pg');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    console.log(err);

  });
})


app.use('/', routes);
app.use('/users', users);
app.use('/create', create);
app.use('/live', live);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
