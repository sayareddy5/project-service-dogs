
const MainController = {
    index: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('index/home.ejs',{authorized, username, title: "Service Dogs"});
    },
    careers: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('aboutTemplates/careers.ejs',{authorized, username, title: "Careers"});
    }
};


module.exports = MainController

// register: (req,res) => {
//     res.render('user/login.ejs');
// }