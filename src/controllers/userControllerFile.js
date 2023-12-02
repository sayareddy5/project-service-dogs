const User = require('../models/User');
const {Feed, Like, Comment} = require("../models/userFeed");
const bcrypt = require('bcrypt');
const {S3, deleteObjectFromS3} = require("../../config/amazonS3");



require('dotenv').config();
const saltRounds = 10;

const crypto = require("crypto")

// use nodemailer to send the emails to the user
const nodemailer = require('nodemailer');

// setup the required authentication to send an email
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  }
});

const UserController = {

  showRegisterForm: (req, res) => {
    // get the user details if the user exists in  req.session  object
    const authorized = req.session.user && req.session.user.authorized === true;
    const username = req.session.user ? req.session.user.username : null;
    
    if(authorized){
      res.render('index/home.ejs',{authorized, username, error: null})
    }else{

      res.render('user/register', {authorized, username, error: null, title:'User Registration',imageUrl:null});
    }
  },

  handleRegistration: async (req, res) => {
    
      try {
        
        // get registration data
        
        const { email, password, confirmpassword, firstName,lastName } = req.body;
        let usernameUpdated = req.body.username
        
        if(password != confirmpassword){
          return res.status(400).render("user/register", {
            authorized: false,
            username: null,
            error: 'Passwords does not match',
            title: "sign up"
          })
        }

        
        // check if the user exists
        const existingUser = await User.findOne({
            $or: [{ username: usernameUpdated }, { email: email }]
        });

        if (existingUser) {

            // If exists send error message
            return res.status(400).render("user/register", {
              authorized: false,
              username: null,
              error: 'User already exists',
              title: "sign up"
            });
        }

        // or create a new user 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username: usernameUpdated, email, password:hashedPassword, firstName,lastName });
        await newUser.save();
      
        // res.redirect('/user/success');
        return res.redirect("/user/login")
      } catch (err) {
        console.error(err);
        return res.sendStatus(500).send('Error registering user');
      }
  },

  showLoginForm: (req, res) => {
    // get the user details if the user exists in  req.session  object
      const authorized = req.session.user && req.session.user.authorized === true;
      const username = req.session.user ? req.session.user.username : null;
      
      if(req.session.error){
        req.session.error = false
      }
      
      res.render('user/login', { authorized, username, error: null, title:"User Login",imageUrl:null });
  
  },

  HandleLoginForm: async (req, res) => {
      
      let  { username, password } = req.body;
      // console.log(username,password)
      username = username.toLowerCase()
      const user = await User.findOne({ username});
      //  if user exusts we get user obejct
      if(!user){  // 
        // req.session.error = true
        return res.render('user/login', {
          authorized: false,
          username: null,
          error: 'User does not exist',
          title: "Login"
        })
      }

      // console.log(user)
      
      const passwordMatch = await bcrypt.compare(password, user.password);

      if(passwordMatch){
        // save the user in req.session object
        req.session.user = {
          id: user._id,
          username: user.username,
          authorized: true,
          imageUrl: user.imageUrl ? user.imageUrl : null
        }
        await req.session.save()
        
       
        const returnTo = req.session.returnTo || "/"
        
        return res.redirect(returnTo);

      }else{
        req.session.error = true
        return res.render('user/login', {
          authorized: false,
          username: null,
          error:  'Invalid credentials',
          title: 'Login'
      });
      }
  },
  
  HandleLogout: async (req,res) =>{
    req.session.destroy();
    return res.redirect("/");
  },

  showForgotPassword: (req, res) => {
    res.render('user/reset-page', { authorized:null, username:null, error: null, title:"Forgot Password" ,imageUrl:null});
  },

  handleForgotPassword: async (req, res) =>{
      const { email } = req.body;

      // gnerate a random token
      const resetToken = crypto.randomBytes(60).toString('hex');
      const getUser = await User.findOne({email: email})
      try{

        if (getUser) {
          // set the token in the users resetCode field
          getUser.resetCode = resetToken;
          // save the user with the reset token
          await getUser.save();
          
          // construct an email to send to the user to reset their password with the link
          const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: 'Password Reset Link - Service Dogs',
            html: `<div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 5px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 15px;">We received a request to reset the password . To proceed with the password reset, please click on the link below.</p>
            <a href="http://localhost:3000/user/reset-password?token=${resetToken}" style="display: inline-block; padding: 10px 20px; font-size: 18px; color: #fff; background-color: #3498db; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease;">Reset Password</a>
            </div>`
          };

          // send the email to the user
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return res.status(500).send('Error sending email.');
              } else {
                console.log('Email sent: ' + info.response);
                return res.status(201).send('Email sent successfully. Please check your inbox.');
              }
            });
          } else {
            return res.status(201).send("Email does not exist in our records");
          }
      }catch(error){
          return res.status(201).send("Server error, try again later");
      }
  },
  handleResetToken: async(req, res) =>{

      // get the token from the req.query
      const { token } = req.query;

      // fing the user with the given token
      const user = await User.findOne({ resetCode: token });
      
      if (!user) {
          return res.send('Invalid or expired reset link.');
      }
      const user_id = user._id

      // render the new-password page to let the user to change therir password
      res.render('user/new-password-page.ejs',{ authorized:null, username:null, error: null, title:"Reset Password" ,resetCode : token, userId:user_id, imageUrl:null} );
  },

  handleResetPassword: async(req,res) =>{

      // get the detiils from the req.body
      const { userId, newPassword, resetCode } = req.body;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const user = await User.findOne({_id: userId, resetCode: resetCode});
      if (!user) {
          return res.status(400).send('Invalid user ID or Expired link.');
      }
      try{

        // set the users password to the new password
        user.password = hashedPassword;

        // set the users resetCode field to null 
        user.resetCode = null;

        // save the user to the req.session 
        req.session.user = {
          id: user._id,
          username: user.username, 
          authorized: true,
          imageUrl: user.imageUrl ? user.imageUrl : null
          
        };
        await user.save();
        const imageUrl = user.imageUrl
        res.render('user/reset-succesful', { authorized:req.session.user.authorized, username:req.session.user.username, error: null, title:"password reset Succesful" ,imageUrl:imageUrl});
      }catch(error){
        return res.status(500).error({"success": "false", "message": "Something is wrong with us, Please try later"});
      }
  },
  getProfilePage: async (req, res) => {
      const authorized = req.session.user && req.session.user.authorized === true;
      const username = req.session.user ? req.session.user.username : null;

      const reqestedUsername = req.params.username
      const successMessage = null

      const user = await User.findOne({username: reqestedUsername })
      if(!user){
        res.send(`User Does not Exist`);
      }
      
      // check if the user already has filed values exists to pass them to the front end or set to null
      const firstName = user.firstName ? user.firstName : null
      const lastName = user.lastName ? user.lastName : null
      const imageUrl = user.imageUrl ? user.imageUrl : null
      
      
      return res.render('user/profile', { authorized, username, error: null, title: 'Profile',firstName:firstName, lastName:lastName,imageUrl:imageUrl , successMessage: successMessage});
  },
  
  saveProfilePage: async (req, res) => {
    const reqestedUsername = req.params.username;
    const authorized = req.session.user && req.session.user.authorized === true;
    const username = req.session.user ? req.session.user.username : null;
  
    if (reqestedUsername !== username) {
      res.status(500).json({ error: "Something is wrong, May be it is not your account " });
    }
    
    // save s3 url in the new variable
    const newImageUrl = req.file ? `${req.file.location}` : null;
    const { firstName, lastName } = req.body;
  
    try {
      const existingProfile = await User.findOne({ username: username });
  
      // delete existing image from S3
      if (existingProfile.imageUrl) {
        deleteObjectFromS3(existingProfile.imageUrl)
            .then(() => {
                console.log('Image deletion process started');
            })
            .catch((err) => {
                console.error('Error starting image deletion process:', err);
            });
      }
  
      // update user profile
      if (firstName) {
        existingProfile.firstName = firstName;
      }
      if (lastName) {
        existingProfile.lastName = lastName;
      }
      if (newImageUrl) {
        existingProfile.imageUrl = newImageUrl;
      }
  
      await existingProfile.save();
  
      // set the values to the updated field values if the user provided
      const UpdatedfirstName = existingProfile.firstName || null;
      const UpdatedlastName = existingProfile.lastName || null;
      const imageUrl = existingProfile.imageUrl || null;
  
      req.session.user.imageUrl = imageUrl;
  
      return res.render('user/profile', {
        authorized,
        username,
        error: null,
        title: 'Profile',
        firstName: UpdatedfirstName,
        lastName: UpdatedlastName,
        imageUrl: imageUrl,
        successMessage: "Profile changed successfully",
      });
    } catch (error) {
      console.error(error);
      return res.render('user/profile', {
        authorized,
        username,
        error: null,
        title: 'Profile',
        firstName: UpdatedfirstName,
        lastName: UpdatedlastName,
        imageUrl: imageUrl,
        successMessage: "Something is wrong. Try Again",
      });
    }
  },

  showChangePassword: async(req, res) => {
      const authorized = req.session.user && req.session.user.authorized === true;
      const username = req.session.user ? req.session.user.username : null;
      const userImageUrl = req.session.user ? req.session.user.imageUrl : null

      const user = await User.findOne({username: username})
      const userId = user._id
      return res.render('user/change-password', { authorized, username, error: null, title: 'Change Password',imageUrl:userImageUrl, userId});
  },

  handleChangePassword : async(req, res) =>{
    const { userId, oldPassword, newPassword} = req.body;
    try {
        const user = await User.findOne({_id : userId});

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        // Check if the old password provided matches the user's current password
        if (user.password !== oldPassword) {
            return res.status(401).json({ error: 'Incorrect old password.' });
        }


        // Update the user's password
        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
  },
  viewUserProfile : async (req, res) =>{
      const { username } = req.params;
      const authorized = req.session.user && req.session.user.authorized === true;
      const currentUsername = req.session.user ? req.session.user.username : null;
      const userImageUrl = req.session.user ? req.session.user.imageUrl : null
      try{
            
          const userView = await User.findOne({ username : username})
          console.log("requestedProfile", userView.username, 'currentUser', currentUsername)
          if(userView.username == currentUsername){
            return res.redirect(`/user/${currentUsername}/profile`);
          }

          // console.log(userView.firstName)
          res.render('user/view-profile.ejs',{authorized, username: currentUsername, title: `${username} profile`,imageUrl:userImageUrl, userView,});

      }catch(error){
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        
      }
      
  },

  viewUserProfilePosts : async (req, res) =>{
      const { username } = req.params;
      const authorized = req.session.user && req.session.user.authorized === true;
      const currentUsername = req.session.user ? req.session.user.username : null;
      const userImageUrl = req.session.user ? req.session.user.imageUrl : null
          try{
            
              const userView = await User.findOne({ username : username})
              console.log(userView)
              if(userView.username == currentUsername){
                return res.redirect(`/feed/user-posts`);
              }
              // get all the user posts and sort them in new data first and populate it with the user info, comment and likes of the feeds
              const userPosts = await Feed.find({ user: userView._id }).populate({
                  path: 'user',
                  select: 'username imageUrl', 
              })
              .populate({
                  path: 'comments.user',
                  select: 'username imageUrl',
              })
              .populate({
                  path: 'likes.user',
                  select: 'username',
              })
              .sort({ datePosted: -1 });

              res.render('user/view-user-posts.ejs',{authorized, username: currentUsername, title: `${username} profile`,userView,userPosts : userPosts,imageUrl:userImageUrl});

          }catch(error){
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
            
          }
    },
    viewUserMessages: async (req, res) =>{
      const { username } = req.params;
      const authorized = req.session.user && req.session.user.authorized === true;
      const currentUsername = req.session.user ? req.session.user.username : null;
      const userImageUrl = req.session.user ? req.session.user.imageUrl : null
          try{
            
              const userView = await User.findOne({ username : username})
              console.log(userView)
              if(userView.username == currentUsername){
                return res.redirect(`/feed/user-posts`);
              }
          

              res.render('user/messages.ejs',{authorized, username: currentUsername, title: `${username} profile`,userView});

          }catch(error){
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
            
          }
    }
};

module.exports = UserController;

