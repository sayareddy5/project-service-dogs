const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllerFile')
// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/',mainController.index);

console.log("In Main Routes")
module.exports = router;