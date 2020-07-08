var Sequelize = require('sequelize');
var sequelize = require('./config');


const ImageHyip = sequelize.define('imageHyip', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fileName: {
    type: Sequelize.STRING,
    required: true
  },
  originalName: {
    type: Sequelize.STRING,
    required: true
  },
  logo: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
}, {
  timestamps: true,
});

module.exports = ImageHyip;
