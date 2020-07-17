var express = require('express');
var router = express.Router();
var passport = require('../authentication').passport
, LocalStrategy = require('passport-local').Strategy;
const managers = require('../managers')
const models = require('../models');

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.findOne({ where: { username } })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
    .catch(err => {
      return done(err);
    })


  }
));

router.get('/login', function(req, res, next) {
  res.render('login')
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    // Redirect if it fails
    if (!user){
      req.flash('error', [info.message])
      return res.redirect('/users/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // Redirect if it succeeds
      return res.redirect(req.session.redirectTo);
    });
  })(req, res, next);
});

module.exports = router;
