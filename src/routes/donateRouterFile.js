const express = require('express');
const router = express.Router();
const DonateController = require('../controllers/donateControllerFile')
// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/',DonateController.index);
router.get('/payment-page',DonateController.paymentPage);
router.post('/process-payment',DonateController.handlePayment);


console.log("In Donate Routes")
module.exports = router;