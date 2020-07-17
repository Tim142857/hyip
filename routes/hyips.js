const express = require('express');
const router = express.Router();
const path = require('path');
const managers = require('../managers')
const models = require('../models');
const clip = require("text-clipper").default;
const Middlewares = require('../middlewares');

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



router.use((req, res, next) => {
  res.locals = {
    title: 'Tim & Joris - Les bons plans'
  };
  next();
});


/* HYIPS */
router.get('/', function(req, res, next) {
  console.log('ici /hyips')
  managers.hyip.findAll()
  .then(hyips => {
    hyips.forEach(hyip => {
      hyip.truncatedPresentation = clip(hyip.presentation, 200, { html: true })
    })
    res.render('hyips', { title: 'HYIPs', hyips });
  })
});

router.get('/create', Middlewares.isAdmin, function(req, res, next) {
  res.render('hyip_edit', { title: 'Ajout HYIP' });
});

router.post('/create', upload.fields([
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
      let redirectUrl = '/hyips/' + hyip.id;
      res.redirect(redirectUrl);
    })
  })
});

router.get('/edit/:id', Middlewares.isAdmin, function(req, res, next) {
  let id = req.params.id;
  managers.hyip.findOneById(id)
  .then(hyip => {
    if(!hyip){
      res.redirect('/hyips')
    } else {
      res.render('hyip_edit', { title: 'Modification hyip ' + hyip.name, hyip });
    }
  })
});

router.post('/edit', upload.fields([
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
      let redirectUrl = '/hyips/' + hyip.id;
      res.redirect(redirectUrl);
    })
  })
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  managers.hyip.findOneById(id)
  .then(hyip => {
    if(!hyip){
      res.redirect('/hyips')
    } else {
      res.render('hyip_details', { title: hyip.name, hyip });
    }
  })
});

module.exports = router;
