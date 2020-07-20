var Sequelize = require('sequelize');
var sequelize = require('./config');


const Message = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    required: true
  },
  mail: {
    type: Sequelize.STRING,
    required: true
  },
  content: {
    type: Sequelize.STRING,
    required: true
  },
}, {
  timestamps: true,
});

module.exports = Message;
