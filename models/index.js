var config = require('./config');
var Hyip = require('./hyip');
var ImageHyip = require('./imageHyip');
var User = require('./user');
var Message = require('./message');
var Post = require('./post');

var Models = {
  Hyip,
  ImageHyip,
  User,
  Message,
  Post
}

Hyip.hasMany(ImageHyip, { as: 'images' });

module.exports = Models;
