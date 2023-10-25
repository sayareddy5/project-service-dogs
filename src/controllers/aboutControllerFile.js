
const AboutController = {
    organizationHandle: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        res.render('abouttemplates/organization.ejs',{username, authorized, title:"Our Organization"});
    },
    FAQHandle: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        res.render('abouttemplates/faq.ejs',{username, authorized, title:"Our Organization"});
    },
    newsletterHandle: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        res.render('abouttemplates/newsletter.ejs',{username, authorized, title:"Our Organization"});
    }
};


module.exports = AboutController