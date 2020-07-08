const express = require('express');
const router = express.Router();
const path = require('path');
const managers = require('../managers')
const models = require('../models');
const multer = require('multer');
// SET STORAGE
var upload = multer({ dest: 'uploads' })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
  }
})

var upload = multer({ storage: storage })


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

router.post('/hyip/create', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'images', maxCount: 4 }
]),function(req, res, next) {
  managers.hyip.insert(req.body)
  .then(hyip => {
    return Promise.all([
      managers.ImageHyip.buildFromBody(hyip.id, req.files.images),
      managers.ImageHyip.buildLogo(hyip.id, req.files.logo[0])
    ])
    .then( () => {
      let redirectUrl = '/hyip/' + hyip.id;
      res.redirect(redirectUrl);
    })
  })
});

router.get('/hyip/edit/:id', function(req, res, next) {
  let id = req.params.id;
  managers.hyip.findOneById(id)
  .then(hyip => {
    res.render('hyip_edit', { title: 'Express', hyip });
  })
});

router.post('/hyip/edit', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'images', maxCount: 4 }
]), function(req, res, next) {
  managers.hyip.edit(req.body)
  .then(hyip => {
    return Promise.all([
      managers.ImageHyip.buildFromBody(hyip.id, req.files.images),
      managers.ImageHyip.buildLogo(hyip.id, req.files.logo[0])
    ])
    .then( () => {
      let redirectUrl = '/hyip/' + hyip.id;
      res.redirect(redirectUrl);
    })
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
