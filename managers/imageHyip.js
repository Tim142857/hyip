const DAL = require('../dal')
const { ImageHyip } = require('../models')

const buildFromBody = function(hyipId, images){
  if(!images || images.length===0){
    return Promise.resolve([])
  }
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

const buildLogo = function(hyipId, files){
  if(!files || files.length === 0) return Promise.resolve()
  let file = files[0]
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
