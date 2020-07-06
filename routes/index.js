const express = require('express');
const router = express.Router();
const path = require('path');
const managers = require('../managers')

const hyipsFixtures = require('../fixtures/hyips');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/hyips')
});

router.get('/hyips', function(req, res, next) {
  managers.hyip.findAll()
  .then(hyips => {
      res.render('hyips', { title: 'Express', hyips });
  })
});

router.get('/insertFixtures', function(req, res, next) {
  console.log(hyipsFixtures)
  for(var hyip of hyipsFixtures){
    managers.hyip.insert(hyip)
  }
  res.redirect('/hyips');
});

router.get('/hyip/:id', function(req, res, next) {
  var id = req.params.id;
  managers.hyip.findOneById(id)
  .then(hyip => {
    console.log('hyip', hyip)
      res.render('hyip_details', { title: 'Express', hyip });
  })
});

module.exports = router;
