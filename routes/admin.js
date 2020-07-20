var express = require('express');
var router = express.Router();
const managers = require('../managers')

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
  managers.Hyip.findAll()
  .then(hyips => {
    res.render('admin/homepage', { hyips })
  })
});

router.get('/hyip/edit/:id',function(req, res, next) {
  let id = req.params.id;
  managers.Hyip.findOneById(id)
  .then(hyip => {
    if(!hyip){
      res.redirect('/admin')
    } else {
      res.render('admin/hyip_edit', { title: 'Modification hyip ' + hyip.name, hyip });
    }
  })
});

router.post('/hyip/edit', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'images', maxCount: 4 }
]), function(req, res, next) {
  managers.Hyip.edit(req.body)
  .then(hyip => {
    return Promise.all([
      managers.ImageHyip.buildFromBody(hyip.id, req.files.images),
      managers.ImageHyip.buildLogo(hyip.id, req.files.logo)
    ])
    .then( () => {
      let redirectUrl = '/admin'
      res.redirect(redirectUrl);
    })
  })
});

router.get('/hyip/delete/:id',function(req, res, next) {
  req.flash('error', ["impossible de supprimer un hyip pour le moment"])
  res.redirect('/admin')
});

router.get('/hyip/create', function(req, res, next) {
  res.render('admin/hyip_edit', { title: 'Ajout HYIP' });
});


router.post('/hyip/create', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'images', maxCount: 4 }
]),function(req, res, next) {
  managers.Hyip.insert(req.body)
  .then(hyip => {
    return Promise.all([
      managers.ImageHyip.buildFromBody(hyip.id, req.files.images),
      managers.ImageHyip.buildLogo(hyip.id, req.files.logo)
    ])
    .then( () => {
      let redirectUrl = '/admin';
      res.redirect(redirectUrl);
    })
  })
});

module.exports = router;
