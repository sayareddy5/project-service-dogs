const express = require('express');
const router = express.Router();
const FeedController = require('../controllers/FeedControllerFile')
// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/',FeedController.home);


console.log("In Feed Routes")
module.exports = router;