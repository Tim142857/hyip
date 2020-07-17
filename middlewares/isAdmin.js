module.exports = function(req, res, next){
  console.log('middleware')
  if(!req.user){
    res.redirect('/users/login');
  } else if(req.user.role !== "admin"){
    req.flash('error', ["Vous n'avez pas les droits"])
    res.redirect('/')
  } else {
    next();
  }
}
