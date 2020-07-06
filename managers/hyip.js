const DAL = require('../dal')

module.exports = {
  findAll: function(){
    return DAL.hyip.findAll();
  },
  findOneById: function(id){
    return DAL.hyip.findOneById(id);
  },
  insert: function(hyip){
    return DAL.hyip.insert(hyip);
  }
}
