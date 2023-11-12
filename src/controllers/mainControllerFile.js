const User = require("../models/User")

const MainController = {
    index: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        res.render('index/home.ejs',{authorized, username, title: "Service Dogs",imageUrl:userImageUrl});
    },
    careers: async(req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        res.render('aboutTemplates/careers.ejs',{authorized, username, title: "Careers",imageUrl:userImageUrl});
    }
};


module.exports = MainController

