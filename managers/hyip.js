const DAL = require('../dal')
const { Hyip, ImageHyip } = require('../models')

const findAll = function(sortBy = "updatedAt"){
  let possiblesSortBy = ["updatedAt", "minimalDeposit", "serious"]
  let order = sortBy === "minimalDeposit" ? 'ASC' : 'DESC';
  if(possiblesSortBy.includes(sortBy)){
    return Hyip.findAll({
      include: { model: ImageHyip, as: 'images' },
      order : [
        [ sortBy, order ]
      ]
    })
  }
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
