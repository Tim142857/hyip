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


router.get('/', function(req, res, next) {
  let sortBy = req.query.sortBy;
  managers.Hyip.findAll(sortBy)
  .then(hyips => {
    hyips.forEach(hyip => {
      hyip.truncatedPresentation = clip(hyip.presentation, 100, { html: true })
    })
    res.render('hyips', { title: 'HYIPs', hyips, sortBy });
  })
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  managers.Hyip.findOneById(id)
  .then(hyip => {
    if(!hyip){
      res.redirect('/hyips')
    } else {
      res.render('hyip_details', { title: hyip.name, hyip });
    }
  })
});


module.exports = router;
