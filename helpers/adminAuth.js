const User = require("../src/models/User");

async function isLoggedIn(req, res, next) {
    
    try {
        if (req.session.user) {
            const current_user_username = req.session.user.username;
            const user = await User.findOne({ username: current_user_username });
            
            if (user && user.isAdmin) {
                return next();

            }else{
                req.session.returnTo = req.originalUrl;
                return res.render('admin/admin-login', { error: "The user is not authorized to access this page. Please try with admin credentials.",authorized: false,
                username: null,
                title: " Admin Login",
                layout: 'baseTemplates/admin', });
            }
        }
        
        
        // user is not logged in or not an admin, redirect to /admin/login 
        return res.render('admin/admin-login', { error: null,authorized: false,
        username: null,
        title: " Admin Login",
        layout: 'baseTemplates/admin', });
    } catch (error) {

        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = isLoggedIn;
