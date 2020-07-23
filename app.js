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


/* I18N */
app.use(Middlewares.i18n)


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
