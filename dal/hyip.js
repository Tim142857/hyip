const filename = './data/hyip.nosql';
const nosql = require('nosql');
const db = nosql.load(filename);
const Fs = require('fs');
const _ = require('lodash');

const findAll = function(){
  return new Promise((resolve, reject) => {
    db.find().make(function(filter) {
      filter.callback(function(err, response) {
        if(err) return reject(err)
        resolve(response)
      });
    });
  })
}
const findOneById = function(id){
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
}
const preInsert = async function(hyip){
  if(!hyip.id){
    hyip.id = await getNextId();
    hyip.id = hyip.id.toString();
  }
  hyip.status = hyip.status === 'on' ? 'payeur' : 'non payeur'
  return hyip;
}
const insert = async function(hyip){
  hyip = await preInsert(hyip);
  return new Promise((resolve, reject) => {
    try {
      db.insert(hyip);
      resolve(hyip);
    } catch (e) {
      reject(e)
    }
  })
}
const getNextId = function() {
  return findAll()
  .then(hyips => {
    let ids = hyips.map(hyip => {
      const parsed = parseInt(hyip.id, 10);
      if (isNaN(parsed)) { return 0; }
      return parsed;
    })
    let idMax = Math.max(...ids);
    return idMax + 1;
  })
}

module.exports = {
  findAll,
  findOneById,
  insert
}
