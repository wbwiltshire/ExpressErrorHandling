var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var debug = require('debug')('expresserrorhandler:server');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var moment = require('moment');
var fs = require('fs');

//Setup configuration file
var configurationFile = 'config.json';
var config = JSON.parse(
     fs.readFileSync(configurationFile, 'utf8')
);

//Setup routes (all will be in index.js)
var routes = require('./routes/index');

//Setup view engine (Express) and helpers
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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

app.set('port', process.env.PORT);
http.createServer(app).listen(app.get('port'), function () {
     console.log('Express server listening on port: ' + app.get('port'));
});

module.exports = app;
