module.exports = function(req, res, next){
  if(req.user){
    next()
  } else {
    req.session.redirectTo = req.originalUrl
    res.redirect('/users/login');
  }
}
