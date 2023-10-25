const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllerFile');

router.get('/register', userController.showRegisterForm);
router.post('/register', userController.handleRegistration);
router.get('/login', userController.showLoginForm);
router.post('/login', userController.HandleLoginForm);
router.get('/logout', userController.HandleLogout);

console.log("In user Routes")
module.exports = router;
