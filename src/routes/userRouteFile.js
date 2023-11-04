const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllerFile');
const passport = require('../controllers/authController');



router.get('/register', userController.showRegisterForm);
router.post('/register', userController.handleRegistration);
router.get('/login', userController.showLoginForm);
router.post('/login', userController.HandleLoginForm);
router.get('/logout', userController.HandleLogout);
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/user/login' }),
    (req, res) => {
        req.session.user = {
            id: req.user._id, // Assuming req.user contains the user object from the callback
            username: req.user.username, // Set the username in the session
            authorized: true,
        };
        // Successful authentication, redirect or respond as needed.
        res.redirect('/'); // Redirect to user's profile page after successful login
    }
);
console.log("In user Routes")
module.exports = router;
