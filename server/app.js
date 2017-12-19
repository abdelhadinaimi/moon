const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const pgSession = require('connect-pg-simple')(session);
const db = require('./queries');
const app = express();

/* == Loggers == */
//app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
/* == Headers == */
app.use( (req, res, next ) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* == Parsers == */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* == Cookie Session == */
app.use(session({
    store: new pgSession({
      pgPromise : db.getPpPromise()
    }),
    secret: 'spvxs9dfah457qxs6',
    resave: false,
    saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());

/* == Initialization == */

module.exports = app;
