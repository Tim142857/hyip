const { Post } = require('../models')

const findAll = function(){
  return Post.findAll()
}

module.exports = {
  findAll
}
