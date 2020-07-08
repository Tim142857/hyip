const DAL = require('../dal')
const { ImageHyip } = require('../models')

const buildFromBody = function(hyipId, images){
  let imagesToSave = [];
  for(image of images){
    imagesToSave.push({
      fileName: image.filename,
      originalName: image.originalname,
      hyipId: hyipId
    })
  }
  return ImageHyip.bulkCreate(imagesToSave)
}

const buildLogo = function(hyipId, file){
  return ImageHyip.create({
    fileName: file.filename,
    originalName: file.originalname,
    logo: true,
    hyipId: hyipId
  })
}

module.exports = {
  buildFromBody,
  buildLogo
}
