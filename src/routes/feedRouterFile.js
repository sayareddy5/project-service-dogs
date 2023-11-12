const express = require('express');
const router = express.Router();
const FeedController = require('../controllers/FeedControllerFile')
const isLoggedIn = require("../../helpers/userAuth")
const upload = require("../../config/multerC")

// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/',FeedController.home);
router.get('/create-new-post',isLoggedIn, FeedController.showCreatePost);
router.get('/user-posts',isLoggedIn, FeedController.showUserPosts);
router.post('/upload/new-post',isLoggedIn, upload.single('image'),FeedController.createFeed);
router.post('/:postId/comments',isLoggedIn, FeedController.postComment);
router.post('/:postId/like',isLoggedIn, FeedController.postLike);
router.delete('/:postId',isLoggedIn, FeedController.deletePost);

// router.get('/:feedId', FeedController.getFeedById);

module.exports = router;