var config = require('./config');
var Hyip = require('./hyip');
var ImageHyip = require('./imageHyip');
var User = require('./user');

var Models = {
  Hyip,
  ImageHyip,
  User
}

Hyip.hasMany(ImageHyip, { as: 'images' });

module.exports = Models;
