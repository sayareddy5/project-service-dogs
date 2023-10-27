function isLoggedIn(req, res, next) {
    console.log("in checkoauth", req.session.user)
    if (req.session.user) {
      return next();
    } else {
      res.redirect('/user/login'); 
    }
}

module.exports = isLoggedIn