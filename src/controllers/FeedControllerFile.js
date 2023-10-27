const Feed = require("../models/userFeed");
const User = require("../models/User")
const fs = require('fs');

const FeedController = {
    home: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('feed/feed-main.ejs',{authorized, username, title: "Feed"});
    },

    showCreatePost: (req, res) =>{
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('feed/new-post.ejs',{authorized, username, title: "Create POst"});
    },
    createFeed: async( req, res) =>{
        try {
            // Get other form data from the request body
            const { description, username } = req.body;
    
            // Get the image buffer data and content type
            const imageBuffer = fs.readFileSync(req.file.path);
            const contentType = req.file.mimetype;
            const user = await User.findOne({ username: username });
            // Create a new feed instance with image data and content type
            const newFeed = new Feed({
                image: {
                    data: imageBuffer,
                    contentType: contentType
                },
                description: description,
                user: user._id 
            });
    
            // Save the feed to the database
            const savedFeed = await newFeed.save();
    
            // Respond with the saved feed data
            return res.redirect("/feed");
        } catch (error) {
            // Handle error
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


module.exports = FeedController