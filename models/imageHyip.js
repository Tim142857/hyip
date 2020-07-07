var Sequelize = require('sequelize');
var sequelize = require('./config');


const ImageHyip = sequelize.define('imageHyip', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  filename: {
    type: Sequelize.STRING,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = ImageHyip;
