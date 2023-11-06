const User = require('../models/User');
const cache = require('memory-cache');
const passport = require("../controllers/authController")
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const crypto = require("crypto")
cache.put('user_logged', false);

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  }
});

const UserController = {

  showRegisterForm: (req, res) => {
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
        
        const { username, email, password, confirmpassword, firstName,lastName } = req.body;
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
            $or: [{ username: username }, { email: email }]
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
        const newUser = new User({ username, email, password, firstName,lastName });
        await newUser.save();
      
        // res.redirect('/user/success');
        return res.redirect("/user/login")
      } catch (err) {
        console.error(err);
        return res.sendStatus(500).send('Error registering user');
      }
  },

  showLoginForm: (req, res) => {
      const authorized = req.session.user && req.session.user.authorized === true;
      const username = req.session.user ? req.session.user.username : null;
      
      if(req.session.error){
        req.session.error = false
      }
      
      res.render('user/login', { authorized, username, error: null, title:"User Login",imageUrl:null });
  
  },

  HandleLoginForm: async (req, res) => {
      
      const { username, password } = req.body;
      const user = await User.findOne({ username})

      
      if(!user){
        // req.session.error = true
        return res.render('user/login', {
          authorized: false,
          username: null,
          error: 'User does not exist',
          title: "Login"
      })
      }
      
      if(password == user.password){
        
        req.session.user = {
          id: user._id,
          username: user.username,
          authorized: true,
          imageUrl: user.imageUrl ? user.imageUrl : null
        }
        const returnTo = req.session.returnTo || "/"
        
        return res.redirect(returnTo);

      }else{
        req.session.error = true
        return res.render('user/login', {
          authorized: false,
          username: null,
          error:  'Invalid credentials',
          title: 'Loppgin'
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
      const resetToken = crypto.randomBytes(20).toString('hex');
      const getUser = await User.findOne({email: email})
      try{

        if (getUser) {
          getUser.resetCode = resetToken;
          await getUser.save();
          
          const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: 'Password Reset Link - Service Dogs',
            html: `<div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 5px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 15px;">Please click on the below link to reset your password. Remember, it only works once.</p>
            <a href="http://localhost:3000/user/reset-password?token=${resetToken}" style="display: inline-block; padding: 10px 20px; font-size: 18px; color: #fff; background-color: #3498db; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease;">Reset Password</a>
            </div>`
          };

          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error(error);
                return res.status(500).send('Error sending email.');
              } else {
                console.log('Email sent: ' + info.response);
                return res.status(201).send('Email sent successfully.');
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
      const { token } = req.query;

      
      const user = await User.findOne({ resetCode: token });
      
      if (!user) {
          return res.send('Invalid or expired reset link.');
      }
      const user_id = user._id
      res.render('user/new-password-page.ejs',{ authorized:null, username:null, error: null, title:"Reset Password" ,resetCode : token, userId:user_id, imageUrl:null} );
  },

  handleResetPassword: async(req,res) =>{
      const { userId, newPassword, resetCode } = req.body;

      const user = await User.findOne({_id: userId, resetCode: resetCode});
      if (!user) {
          return res.status(400).send('Invalid user ID or Expired link.');
      }
      try{

        user.password = newPassword;
        user.resetCode = null;
        req.session.user = {
          id: user._id,
          username: user.username, 
          authorized: true,
          imageUrl: user.imageUrl ? user.imageUrl : null
          
        };
        console.log(user)
        await user.save();
        const imageUrl = user.imageUrl
        res.render('user/reset-succesful', { authorized:req.session.user.authorized, username:req.session.user.username, error: null, title:"password reset Succesful" ,imageUrl:imageUrl});
      }catch(error){
        return res.status(500).error({"success": "false", "message": "Something is wrong with us, Please try later"});
      }
  },
  getProfilePage: async (req, res) => {
      console.log("in get profile page")
      const authorized = req.session.user && req.session.user.authorized === true;
      const username = req.session.user ? req.session.user.username : null;

      const reqestedUsername = req.params.username
      const successMessage = null

      const user = await User.findOne({username: reqestedUsername })
      if(!user){
        res.send(`User Does not Exist`);
      }
      
      const firstName = user.firstName ? user.firstName : null
      const lastName = user.lastName ? user.lastName : null
      const imageUrl = user.imageUrl ? user.imageUrl : null
      
      console.log("sending get profile page")
      
      return res.render('user/profile', { authorized, username, error: null, title: 'Profile',firstName:firstName, lastName:lastName,imageUrl:imageUrl , successMessage: successMessage});
  },

  saveProfilePage: async (req, res) => {
      console.log("in savveeee profile prage")
      const reqestedUsername = req.params.username

      
      const authorized = req.session.user && req.session.user.authorized === true;
      const username = req.session.user ? req.session.user.username : null;

      if(reqestedUsername !== username){
          res.status(500).json({ error: "Internal server error." });
      }

     
      console.log("image path", req.file)

      const newImageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      const { firstName, lastName} = req.body;

      const existingProfile = await User.findOne({ username: username });
      console.log("existing user", existingProfile)

      try {
          // const existingProfile = await User.findOne({ username: username });

          if (existingProfile.imageUrl) {
            const previousImagePath = path.join(__dirname, 'uploads', existingProfile.imageUrl);
            if (fs.existsSync(previousImagePath)) {
              fs.unlinkSync(previousImagePath);
            }
          }

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

          const UpdatedfirstName = existingProfile.firstName ? existingProfile.firstName : null
          const UpdatedlastName = existingProfile.lastName ? existingProfile.lastName : null
          const imageUrl = existingProfile.imageUrl ? existingProfile.imageUrl : null
          req.session.user.imageUrl = imageUrl
          console.log("image url sending: ",imageUrl)

          return res.render('user/profile', { authorized, username, error: null, title: 'Profile',firstName:UpdatedfirstName, lastName:UpdatedlastName,imageUrl:imageUrl,  successMessage:"Profile changed Succesfully"});

      } catch (error) {
       
          return res.render('user/profile', { authorized, username, error: null, title: 'Profile',firstName:UpdatedfirstName, lastName:UpdatedlastName,imageUrl:imageUrl,  successMessage:"Something is wrong, Try Again"});
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
    console.log("user id",userId)
    try {
        const user = await User.findOne({_id : userId});

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        console.log("passwords: ",user.password,oldPassword )
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
  }
};

module.exports = UserController;

