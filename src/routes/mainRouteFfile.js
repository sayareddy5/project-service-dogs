const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllerFile')
// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/',mainController.index);
router.get('/careers',mainController.careers);


module.exports = router;