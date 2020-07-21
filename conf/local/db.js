var DBCONF;

if(process.env.NODE_ENV === "production"){
  DBCONF = {
    host: 'eu-cdbr-west-03.cleardb.net',
    // port: 3306,
    db: 'heroku_69779c33911c09f',
    user: 'b9aa848bfe6323',
    password: '2e92cf4b',
    dialect: 'mysql', // mariadb, mysql
    // DEV - display MySQL logs in stdout when true
    inspect: false,
    sync: true
  }
} else {
  DBCONF = {
    host: 'localhost',
    // port: 3306,
    db: 'hyip',
    user: 'newuser',
    password: 'password',
    dialect: 'mysql', // mariadb, mysql
    // DEV - display MySQL logs in stdout when true
    inspect: false,
    sync: true
  }
}

module.exports = DBCONF;
