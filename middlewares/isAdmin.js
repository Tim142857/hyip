module.exports = function(req, res, next){
  if(!req.user){
    req.session.redirectTo = req.originalUrl
    res.redirect('/users/login');
  } else if(req.user.role !== "admin"){
    req.flash('error', ["Vous n'avez pas les droits"])
    res.redirect('/')
  } else {
    next();
  }
}
