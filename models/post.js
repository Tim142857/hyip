var Sequelize = require('sequelize');
var sequelize = require('./config');

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: Sequelize.TEXT,
    required: true
  }
}, {
  timestamps: true,
});


module.exports = Post;
