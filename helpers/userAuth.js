function isLoggedIn(req, res, next) {
    console.log("in checkoauth", req.session.user)
    if (req.session.user) {
  
      return next();
    } else {
      req.session.returnTo = req.originalUrl;
      res.redirect('/user/login'); 
    }
}

module.exports = isLoggedIn