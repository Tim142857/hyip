var Twig = require('twig');

Twig.extendFunction("getStars", function(current, max) {
  var html = "";
  for(var i = 0; i < current; i++){
    html += '<span class="fa fa-star checked"></span>';
  }
  for(var i = 0; i < (max-current); i++){
    html += '<span class="fa fa-star"></span>';
  }
  return html;
});

Twig.extendFunction("getHyipLogoFileName", function(hyip) {
  for(var image of hyip.images){
    if(image.logo) return image.fileName
  }
  return null;
});
