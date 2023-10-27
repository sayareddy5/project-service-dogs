const express = require('express');
const router = express.Router();
const DonateController = require('../controllers/donateControllerFile')
// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/',DonateController.index);


console.log("In Donate Routes")
module.exports = router;