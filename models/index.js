var config = require('./config');
var Hyip = require('./hyip');
var ImageHyip = require('./imageHyip');
var User = require('./user');
var Message = require('./message');

var Models = {
  Hyip,
  ImageHyip,
  User,
  Message
}

Hyip.hasMany(ImageHyip, { as: 'images' });

module.exports = Models;
