
function isLoggedIn(req, res, next) {
    console.log("in checkoauth", req.session.user)
    if (req.session.user) {
      console.log("proceding to next srtep")
      return next();
    } else {
        
        if(req.headers['content-type'] == "application/json"){
            console.log(req.headers);
            return res.status(401).json({ error: 'Unauthorized' });
        } else {

            console.log("redirecting to login")
            // For non-API routes, redirect to the login page
            req.session.returnTo = req.originalUrl;
            return res.redirect('/user/login');
        }
    }
}

module.exports = isLoggedIn