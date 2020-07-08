var Sequelize = require('sequelize');
var sequelize = require('./config');


const Hyip = sequelize.define('hyip', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    required: true
  },
  url: {
    type: Sequelize.STRING,
    required: true
  },
  serious: {
    type: Sequelize.INTEGER,
    required: true
  },
  profitability: {
    type: Sequelize.INTEGER,
    required: true
  },
  simplicity: {
    type: Sequelize.INTEGER,
    required: true
  },
  sponsorship: {
    type: Sequelize.INTEGER,
    required: true
  },
  percentage: {
    type: Sequelize.INTEGER,
    required: true
  },
  minimalDeposit: {
    type: Sequelize.INTEGER,
    required: true
  },
  payeur: {
    type: Sequelize.BOOLEAN,
    required: true,
    defaultValue: true
  },
  logo: {
    type: Sequelize.STRING,
    required: false
  },
  modesDepot: {
    type: Sequelize.STRING,
    required: true
  },
  modesRetrait: {
    type: Sequelize.STRING,
    required: true
  },
  presentation: {
    type: Sequelize.TEXT,
    required: true
  },
  plans: {
    type: Sequelize.TEXT,
    required: true
  },
  affiliation: {
    type: Sequelize.TEXT,
    required: true
  },
  avis: {
    type: Sequelize.TEXT,
    required: true
  },

}, {
  timestamps: true,
});

module.exports = Hyip;
