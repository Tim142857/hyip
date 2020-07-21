const express = require('express');
const router = express.Router();
const path = require('path');
const managers = require('../managers')
const models = require('../models');



router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/send-message', function(req, res, next) {
  managers.Message.create(req.body)
  .then(msg => {
    req.flash('success', ["Votre message a bien été envoyé"]);
    res.redirect('/');
  })
});

/*  IN PREPARATION */
router.get('/blog', function(req, res, next) {
  res.render('inPreparation');
});

router.get('/trading', function(req, res, next) {
  res.render('inPreparation');
});

router.get('/immobilier', function(req, res, next) {
  res.render('inPreparation');
});

router.get('/about', function(req, res, next) {
  res.render('inPreparation');
});

router.get('/contact', function(req, res, next) {
  res.render('inPreparation');
});


/* 404 */
router.get('*', function(req, res, next) {
  res.redirect('/')
});

module.exports = router;
