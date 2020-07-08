const DAL = require('../dal')
const { Hyip, ImageHyip } = require('../models')

  const findAll = function(){
    return Hyip.findAll({ include: { model: ImageHyip, as: 'images' } })
  }
  const findOneById = function(id){
    return Hyip.findOne({ include: { model: ImageHyip, as: 'images' }, where: {id} });
  }
  const insert = function(hyip){
    console.log('insert hyip: ', hyip)
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
