const { Message } = require('../models')

const create = function(body){
  return Message.create({
    name: body.name,
    mail: body.mail,
    content: body.content
  })
}

module.exports = {
  create
}
