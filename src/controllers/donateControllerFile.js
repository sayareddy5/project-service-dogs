const DonateController = {
    index: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('donate/donate-main.ejs',{authorized, username, title: "Donate"});
    }
};


module.exports = DonateController