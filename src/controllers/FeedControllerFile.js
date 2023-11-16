const {Feed, Like, Comment} = require("../models/userFeed");
const User = require("../models/User")
const fs = require('fs');

const FeedController = {
    home: async (req, res) => {
        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        try {
            // get all the feed data and populate it with the user details, comments and likes and sort them in recent data
            const totalPosts = await Feed.find({})
            .populate({
                path: 'user',
                select: 'username imageUrl', 
            })
            .populate({
                path: 'comments.user',
                select: 'username imageUrl',
            })
            .populate({
                path: 'likes.user',
                select: 'username',
            })
            .sort({ datePosted: -1 });

            
            console.log(totalPosts)
            // render the feed page with the necessary details
        
            res.render('feed/feed-main.ejs',{authorized, username, title: "Feed",totalPosts : totalPosts, imageUrl:userImageUrl});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    },

    showCreatePost: async (req, res) =>{
        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        // render the page witrh required details
        res.render('feed/new-post.ejs',{authorized, username, title: "Create Post",imageUrl:userImageUrl});
    },
    showUserPosts: async (req, res) =>{
        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        var userImageUrl = req.session.user ? req.session.user.imageUrl : null

        try{
            // get the user based on the username from the re.session object
            const user = await User.findOne({ username : username})

            // check if the has profile image else set it to null
            var userImageUrl = user.imageUrl ? user.imageUrl : null

            // get all the user posts and sort them in new data first and populate it with the user info, comment and likes of the feeds
            const userPosts = await Feed.find({ user: user._id }).populate({
                path: 'user',
                select: 'username imageUrl', 
            })
            .populate({
                path: 'comments.user',
                select: 'username imageUrl',
            })
            .populate({
                path: 'likes.user',
                select: 'username',
            })
            .sort({ datePosted: -1 });

            res.render('feed/your-posts.ejs',{authorized, username, title: "User Posts",userPosts : userPosts,imageUrl:userImageUrl});

        }catch(error){
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    
    },
    createFeed: async( req, res) =>{
        
        try {
            // get the feed data from the req.body object
            const { description, username } = req.body;

            // get the file path from the req.file object
            const filePath = req.file.path;

            // get the current user based on  the username
            const user = await User.findOne({ username: username });
            
            // create a new feed instance
            const newFeed = new Feed({
                imageUrl: filePath,
                description: description,
                user: user 
            });
    
            // save the new feed data
            await newFeed.save();
            
            return res.redirect("/feed");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    postComment: async (req, res) => {
        try {
            // get the post id from  the url, which is stored in req.params
            const { postId } = req.params;
            // get the comment data from req.body
            const { commentText } = req.body;
            
            // get the current user
            const username = req.session.user.username; 

            const userComment = await User.findOne({username: username})

            // get the current feed  user comment by the postId
            const feed = await Feed.findById(postId);
            
            // if no feed exists return error
            if (!feed) {
                return res.status(404).json({ error: 'Feed not found' });
            }
            
            // else create a new comment isntance
            const newComment = new Comment({
                user: userComment,
                comment: commentText,
                postId: postId
            })
            await newComment.save()
            // push the new comment to the feed comments array
            feed.comments.push(newComment);
            // save the Updated feed data
            await feed.save();

            res.status(201).json({ totalComments: feed.comments.length, newComment: newComment });
        } catch (error) {
            console.error('Error posting comment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deletePost: async (req,res) => {
        const { postId } = req.params;

        try {
            // delete the feed 
            await Feed.findByIdAndRemove(postId);
            res.status(204).send(); 
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    postLike : async (req,res) => {

        
        const { postId } = req.params;
        const username = req.session.user.username;
        const { liked } = req.body;

        const userLiked = await User.findOne({username : username})
        const currentFeed = await Feed.findById(postId)
        try {
            let updatedPost;

            if (liked) {

                // user already like so remove the like
                const likeInstance = await Like.findOne({ user: userLiked, postId: currentFeed })

                await Like.findByIdAndRemove({_id: likeInstance._id});
                currentFeed.likes.pull(likeInstance._id)
                await currentFeed.save();
            } else {
                // user liked the post
                const newLike = new Like({ user: userLiked, postId: currentFeed });
                await newLike.save()
                currentFeed.likes.push(newLike)
                await currentFeed.save()
            }

            // retrieve the updated post with populated user and comments
            updatedPost = await Feed.findById(postId)
                .populate({
                    path: 'user',
                    select: 'username imageUrl',
                })
                .populate({
                    path: 'comments.user',
                    select: 'username imageUrl',
                })
                .populate({
                    path: 'likes.user',
                    select: 'username',
                });

            res.json({ success: true, updatedPost });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


module.exports = FeedController