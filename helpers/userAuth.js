
function isLoggedIn(req, res, next) {
    
    if (req.session.user) {
       return next();
    } else {
        
        if(req.headers['content-type'] == "application/json"){
            
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