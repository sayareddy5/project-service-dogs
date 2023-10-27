const ContactController = {
    index: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('contact/contact-us.ejs',{authorized, username, title: "Contact"});
    }
};


module.exports = ContactController