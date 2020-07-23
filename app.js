var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('./authentication').passport;
const { Logger } = require('./services')
const logger = new Logger('app');

var flash = require('connect-flash');


/* ROUTERS */
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var hyipsRouter = require('./routes/hyips');
var adminRouter = require('./routes/admin');


var Twig = require('./twig');

const Middlewares = require('./middlewares');




var app = express();


/* WINSTON LOGGER */
// app.use(expressWinston.logger({
//   transports: [
//     new winston.transports.Console()
//   ],
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.json()
//   ),
//   meta: true, // optional: control whether you want to log the meta data about the request (default to true)
//   msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
//   expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
//   colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
//   ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
// }));

app.use(flash());
app.use(session({
  secret: 'mon_secret',
  name: 'mon_cookie',
  resave: true,
  saveUninitialized: true
}));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  logger.info("Request received at \""  + req.url + "\"")
  res.locals = {
    title: 'Les bons plans de Tim',
    errorMessages: req.flash("error"),
    successMessages: req.flash("success"),
    user: req.user
  };
  next();
});


app.use('/users', usersRouter);
app.use('/hyips', hyipsRouter);
app.use('/admin', Middlewares.isAdmin, adminRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  logger.error('URL NOT FOUND : ' + req.url)
  res.render('errors/404')
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  logger.error(req.url)
  logger.error(err.message)

  // render the error page
  res.status(err.status || 500);
  res.render('errors/500');
});

module.exports = app;
