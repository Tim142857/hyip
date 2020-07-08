const DAL = require('../dal')
const { Hyip } = require('../models')

  const findAll = function(){
    return Hyip.findAll()
  }
  const findOneById = function(id){
    return Hyip.findOne({ id });
  }
  const insert = function(hyip){
    return Hyip.create(hyip);
  }
  const edit = function(newHyip){
    return findOneById(newHyip.id)
    .then(hyip => {
      hyip = Object.assign(hyip, newHyip);
      return hyip.save();
    })
  }

module.exports = {
  findAll,
  findOneById,
  insert,
  edit
}
