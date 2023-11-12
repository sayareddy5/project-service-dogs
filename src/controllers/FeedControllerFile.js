const {Feed, Like, Comment} = require("../models/userFeed");
const User = require("../models/User")
const fs = require('fs');

const FeedController = {
    home: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        try {
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

            
            res.render('feed/feed-main.ejs',{authorized, username, title: "Feed",totalPosts : totalPosts, imageUrl:userImageUrl});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        
    },

    showCreatePost: async (req, res) =>{
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        res.render('feed/new-post.ejs',{authorized, username, title: "Create Post",imageUrl:userImageUrl});
    },
    showUserPosts: async (req, res) =>{
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        var userImageUrl = req.session.user ? req.session.user.imageUrl : null

        try{
            const user = await User.findOne({ username : username})
            var userImageUrl = user.imageUrl ? user.imageUrl : null
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
            const { description, username } = req.body;

            const filePath = req.file.path;

            const user = await User.findOne({ username: username });
            
            const newFeed = new Feed({
                imageUrl: filePath,
                description: description,
                user: user 
            });
    
 
            const savedFeed = await newFeed.save();
    
            return res.redirect("/feed");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    postComment: async (req, res) => {
        try {
            const { postId } = req.params;
            const { commentText } = req.body;
            
            const username = req.session.user.username; 
            const userComment = await User.findOne({username: username})
            const feed = await Feed.findById(postId);
    
            if (!feed) {
                return res.status(404).json({ error: 'Feed not found' });
            }
            
            const newComment = new Comment({
                user: userComment,
                comment: commentText,
                postId: postId
            })
            await newComment.save()
            feed.comments.push(newComment);
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
            
            await Feed.findByIdAndRemove(postId);
            res.status(204).send(); // Send a success response
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