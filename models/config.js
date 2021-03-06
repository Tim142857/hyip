require('rootpath')();
var Sequelize = require('sequelize');
var mysqlConf = require('conf').db;
var fixtures = require('sequelize-fixtures');

var sequelize = new Sequelize(mysqlConf.db, mysqlConf.user, mysqlConf.password, {
  host: mysqlConf.host,
  port: mysqlConf.port,
  dialect: mysqlConf.dialect,
  logging(msg) {
    if (mysqlConf.inspect === true) {
      console.log(msg);
    }
  },
  sync: {
    force: true
  },
});

sequelize.authenticate()
.then(() =>{
  console.log('Connection has been established successfully.');
})
.catch(e => {
  console.error('Unable to connect to the database:', e);
})

if(mysqlConf.sync){
  sequelize.sync({force: true})
  .then(function () {
    console.log("Sequelize sync ended / DB updated")
    if(process.env.NODE_ENV === "development"){
      const Models = require('./index')
      fixtures.loadFile('fixtures/data.json', Models)
      .then(function(){
        console.log('Fixtures inserted')
      })
      .catch(function(err){
        console.log('Error during fixtures insertion')
        console.log(err);
      })
    }
  })
  .catch(err =>{
    console.log("Sequelize sync error:")
    console.log(err)
  })
}

module.exports = sequelize;
