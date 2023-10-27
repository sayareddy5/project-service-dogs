const FeedController = {
    home: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('feed/feed-main.ejs',{authorized, username, title: "Feed"});
    }
};


module.exports = FeedController