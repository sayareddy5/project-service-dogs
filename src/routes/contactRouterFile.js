const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactControllerFile')
// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/',ContactController.index);
router.post('/contact-request',ContactController.contactFormHandle);


console.log("In Contact Routes")
module.exports = router;