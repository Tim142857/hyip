const express = require('express');
const router = express.Router();
const path = require('path');
const managers = require('../managers')
const models = require('../models');

const hyipsFixtures = require('../fixtures/hyips');


router.get('/', function(req, res, next) {
  res.redirect('/hyips')
});


/* FIXTURES */
router.get('/insertFixtures', function(req, res, next) {
  console.log(hyipsFixtures)
  for(var hyip of hyipsFixtures){
    managers.hyip.insert(hyip)
  }
  res.redirect('/hyips');
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
    console.log('redirectUrl', redirectUrl)
    res.redirect(redirectUrl);
  })
});

router.get('/hyip/:id', function(req, res, next) {
  var id = req.params.id;
  managers.hyip.findOneById(id)
  .then(hyip => {
    console.log('hyip', hyip)
      res.render('hyip_details', { title: 'Express', hyip });
  })
});

router.get('/insertTest', function(req, res, next) {
  managers.hyip.insertTest()
  .then(hyip => {
    console.log('hyip created', hyip)
      res.render('hyip_details', { title: 'Express', hyip });
  })
  .catch(e=>{
    console.log('error');
    console.log(e);
  })
});


/* 404 */
router.get('*', function(req, res, next) {
  res.redirect('/hyips')
});

module.exports = router;
