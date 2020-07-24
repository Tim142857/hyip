var Sequelize = require('sequelize');
var sequelize = require('./config');
const ImageHyip = require('./imageHyip')

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
    required: true,
    i18n: true
  },
  plans: {
    type: Sequelize.TEXT,
    required: true,
    i18n: true
  },
  affiliation: {
    type: Sequelize.TEXT,
    required: true,
    i18n: true
  },
  avis: {
    type: Sequelize.TEXT,
    required: true,
    i18n: true
  },

}, {
  timestamps: true,
});


module.exports = Hyip;
