const express = require('express');
const router = express.Router();
const AboutController = require('../controllers/aboutControllerFile')
// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/our-organization',AboutController.organizationHandle);
router.get('/faq',AboutController.FAQHandle);
router.post('/faq/ask-question',AboutController.faqFormHanle);

module.exports = router;