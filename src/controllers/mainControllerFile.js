const User = require("../models/User")

const MainController = {
    index: async (req, res) => {
        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        // render page with rewuired details of the user
        res.render('index/home.ejs',{authorized, username, title: "Service Dogs",imageUrl:userImageUrl});
    },
    careers: async(req, res) => {
        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        // render page with rewuired details of the user
        res.render('aboutTemplates/careers.ejs',{authorized, username, title: "Careers",imageUrl:userImageUrl});
    }
};


module.exports = MainController

