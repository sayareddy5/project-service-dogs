const {Feed, Like, Comment} = require("../models/userFeed");
const User = require("../models/User")
const fs = require('fs');

const FeedController = {
    home: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        try {
            const totalPosts = await Feed.find({})
            .populate({
                path: 'user',
                select: 'username', 
            })
            .populate({
                path: 'comments.user',
                select: 'username',
            })
            .sort({ datePosted: -1 });
            res.render('feed/feed-main.ejs',{authorized, username, title: "Feed",totalPosts : totalPosts});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    },

    showCreatePost: (req, res) =>{
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
      
        res.render('feed/new-post.ejs',{authorized, username, title: "Create Post"});
    },
    showUserPosts: async (req, res) =>{
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
       
        try{
            const user = await User.findOne({ username : username})
           
            const userPosts = await Feed.find({ user: user._id }).populate({
                path: 'user',
                select: 'username', 
            })
            .populate({
                path: 'comments.user',
                select: 'username',
            })
            .sort({ datePosted: -1 });
           
            res.render('feed/your-posts.ejs',{authorized, username, title: "User Posts",userPosts : userPosts});
        }catch(error){
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    
    },
    createFeed: async( req, res) =>{
        try {
            // Get other form data from the request body
            const { description, username } = req.body;
    
            // Get the image buffer data and content type
            const filePath = req.file.path;
           
            const user = await User.findOne({ username: username });
            // Create a new feed instance with image data and content type
            const newFeed = new Feed({
                imageUrl: filePath,
                description: description,
                user: user 
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
    },
    postComment: async (req, res) => {
        try {
            const { postId } = req.params;
            const { commentText } = req.body;
            
            const username = req.session.user.username; // Get the authenticated user's ID from the session
            const userComment = await User.findOne({username: username})
            // Find the feed by postId
            const feed = await Feed.findById(postId);
    
            if (!feed) {
                return res.status(404).json({ error: 'Feed not found' });
            }

            // Create a new comment and associate it with the current user
            
            const newComment = new Comment({
                user: userComment,
                comment: commentText,
                postId: postId
            })
            await newComment.save()
            feed.comments.push(newComment);
            await feed.save();

            res.status(201).json(newComment);
        } catch (error) {
            console.error('Error posting comment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deletePost: async (req,res) => {
        const { postId } = req.params;

        try {
            
            await Feed.findByIdAndRemove(postId);
            res.status(204).send(); // Send a success response
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    postLike : async (req,res) => {
        const { postId } = req.params;
       
        const currentUsername = req.session.user.username; // Assuming you store user ID in req.session.user
        const user = await User.findOne({username : currentUsername})
        try {
            // Create a new like and associate it with the current user and postId
            const newLike = new Like({
                user: user._id,
                postId: postId,
            });

            // Find the corresponding post and push the new like into the post's likes array
            const feed = await Feed.findById(postId);
            if (!feed) {
                return res.status(404).json({ error: 'Feed not found' });
            }

            feed.likes.push(newLike);

            // Save the updated post with the new like
            await feed.save();

            // Return the updated post data to the client
            res.status(200).json({ likes: feed.likes });
        } catch (error) {
            console.error('Error toggling like/dislike:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


module.exports = FeedController