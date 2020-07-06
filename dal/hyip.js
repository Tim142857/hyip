const filename = './data/hyip.nosql';
const nosql = require('nosql');
const db = nosql.load(filename);
const Fs = require('fs');

module.exports = {
  findAll: function(){
    return new Promise((resolve, reject) => {
      db.find().make(function(filter) {
        filter.callback(function(err, response) {
          if(err) return reject(err)
          resolve(response)
          });
        });
    })
  },
  findOneById: function(id){
    return new Promise((resolve, reject) => {
      db.find().make(function(filter) {
        filter.where("id", id);
        filter.callback(function(err, response) {
          if(err) return reject(err)
          if(response.length !== 1) return reject('404')
          resolve(response[0])
          });
        });
    })
  },
  insert: function(hyip){
    return new Promise((resolve, reject) => {
      try {
        db.insert(hyip);
        resolve();
      } catch (e) {
        reject(e)
      }
    })
  },
}
