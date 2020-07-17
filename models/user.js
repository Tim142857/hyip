var Sequelize = require('sequelize');
var sequelize = require('./config');


const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    required: true
  },
  password: {
    type: Sequelize.STRING,
    required: true
  },
  role: {
    type: Sequelize.STRING,
    required: true,
    defaultValue: "member"
  },
}, {
  timestamps: true,
});

module.exports = User;
