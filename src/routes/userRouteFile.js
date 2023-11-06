const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllerFile');
const passport = require('../controllers/authController');
const isLoggedIn = require("../../helpers/userAuth");
const upload = require("../../config/multerC")


router.get('/register', userController.showRegisterForm);

router.post('/register', userController.handleRegistration);

router.get('/login', userController.showLoginForm);

router.get('/forgot-password', userController.showForgotPassword);

router.post('/forgot-password', userController.handleForgotPassword);

router.get('/reset-password', userController.handleResetToken);

router.post('/change-password', userController.handleResetPassword);

router.post('/login', userController.HandleLoginForm);

router.get('/:username/profile',isLoggedIn, userController.getProfilePage);

router.get('/:username/change-password',isLoggedIn, userController.showChangePassword);

router.post('/:username/change-password',isLoggedIn, userController.handleChangePassword);

router.post('/:username/profile',isLoggedIn,upload.single('profilePic'), userController.saveProfilePage);

router.get('/logout',userController.HandleLogout);

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/user/login' }),
    (req, res) => {
        req.session.user = {
            id: req.user._id,
            username: req.user.username, 
            authorized: true,
            imageUrl: req.user.imageUrl ? req.user.imageUrl : null
        };
        
        res.redirect('/'); 
    }
);
console.log("In user Routes")
module.exports = router;
