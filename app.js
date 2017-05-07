const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const conf = require ('./configuration/conf');
const tokenValidator = require ('./utils/tokenValidator');
const index = require('./routes/index');
const login = require('./routes/login');

// Creating the app
const app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'routes'));
app.set('view engine', 'ejs');

// MIDDLEWARE SETUP

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serving static content
app.use(express.static(path.join(__dirname, 'public')));

/*
/* routes
*/

// https check
app.all('*', (req, res, next) => {
  // If ssl is enabled, ensure all requests are redirected to https
  if (conf.sslEnabled && !req.secure) {
    res.redirect(`https://${req.hostname}:${conf.sslPort}${req.url}`);
  } else {
    next();
  }
});

// login route, unrestricted.
// must be placed before token check ! (not authentication needed)
app.use('/login', login);

// token check
app.all('*', (req, res, next) => {
  // check the the user is authorized to access the application
  if (tokenValidator.isTokenValid(req.cookies.userToken)){
    // token OK : go to the next route
    next();
  } else {
   // No token or incorrect token : redirect to login page
    res.redirect(`/login?failed=${req.query.failed ? 1 : 0}`);
  }
});

// redirect every route that hasn't been match yet to index route
app.use('/', index);

// Last middleware, will catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send(err);
});

module.exports = app;
