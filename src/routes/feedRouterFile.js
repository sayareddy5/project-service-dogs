const express = require('express');
const router = express.Router();
const FeedController = require('../controllers/FeedControllerFile')
const isLoggedIn = require("../../helpers/userAuth")
const upload = require("../../config/multerC")

// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/',FeedController.home);
router.get('/create-new-post',isLoggedIn, FeedController.showCreatePost);
router.post('/upload/new-post', upload.single('image'),FeedController.createFeed);
// router.get('/:feedId', FeedController.getFeedById);

console.log("In Feed Routes")
module.exports = router;