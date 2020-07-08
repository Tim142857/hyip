var config = require('./config');
var Hyip = require('./hyip');
var ImageHyip = require('./imageHyip');

var Models = {
  Hyip,
  ImageHyip
}

Hyip.hasMany(ImageHyip, { as: 'images' });

module.exports = Models;
