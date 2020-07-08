const express = require('express');
const router = express.Router();
const path = require('path');
const managers = require('../managers')
const models = require('../models');

const hyipsFixtures = require('../fixtures/hyips');


router.get('/', function(req, res, next) {
  res.redirect('/hyips')
});


/* HYIPS */
router.get('/hyips', function(req, res, next) {
  managers.hyip.findAll()
  .then(hyips => {
      res.render('hyips', { title: 'Express', hyips });
  })
});

router.get('/hyip/create', function(req, res, next) {
  res.render('hyip_edit', { title: 'Express' });
});

router.post('/hyip/create', function(req, res, next) {
  managers.hyip.insert(req.body)
  .then(hyip => {
    let redirectUrl = '/hyip/' + hyip.id;
    res.redirect(redirectUrl);
  })
});

router.get('/hyip/edit/:id', function(req, res, next) {
  let id = req.params.id;
  managers.hyip.findOneById(id)
  .then(hyip => {
    res.render('hyip_edit', { title: 'Express', hyip });
  })
});

router.post('/hyip/edit', function(req, res, next) {
  managers.hyip.edit(req.body)
  .then(hyip => {
    let redirectUrl = '/hyip/' + hyip.id;
    res.redirect(redirectUrl);
  })
});

router.get('/hyip/:id', function(req, res, next) {
  var id = req.params.id;
  managers.hyip.findOneById(id)
  .then(hyip => {
      res.render('hyip_details', { title: 'Express', hyip });
  })
});


/* 404 */
router.get('*', function(req, res, next) {
  res.redirect('/hyips')
});

module.exports = router;
