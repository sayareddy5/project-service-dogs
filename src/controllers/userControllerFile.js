const User = require('../models/User');
const cache = require('memory-cache');

// set user_logged in cache
cache.put('user_logged', false);

const UserController = {

  UserLogged : () => {
    return cache.get('user_logged');
  },

  showRegisterForm: (req, res) => {
    const authorized = req.session.user && req.session.user.authorized === true;
    const username = req.session.user ? req.session.user.username : null;
    
    if(authorized){
      res.render('index/home.ejs',{authorized, username, error: null})
    }else{

      res.render('user/register', {authorized, username, error: null, title:'User Registration'});
    }
  },

  handleRegistration: async (req, res) => {
    
    try {
      
      // get registration data
      console.log("user-data-registration", req.body)
      const { username, email, password, confirmpassword } = req.body;
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
      const newUser = new User({ username, email, password });
      await newUser.save();
    
      // res.redirect('/user/success');
      return res.redirect("/user/login")
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error registering user');
    }
  },

  showLoginForm: (req, res) => {
    const authorized = req.session.user && req.session.user.authorized === true;
    const username = req.session.user ? req.session.user.username : null;
    
    if(req.session.error){
      req.session.error = false
    }
    console.log("session log",req.session)
    res.render('user/login', { authorized, username, error: null, title:"User Login" });
  
  },

  HandleLoginForm: async (req, res) => {
      console.log(req.body)
      const { username, password } = req.body;
      const user = await User.findOne({ username})

      console.log("user-detail",user)
      if(!user){
        req.session.error = true
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
          title: 'Service Dogs'
        }
        console.log(req.session.user)
        return res.redirect("/");

      }else{
        req.session.error = true
        return res.render('user/login', {
          authorized: false,
          username: null,
          error: request.session.error == true ? 'Invalid credentials' : null,
          title: 'Loppgin'
      });
      }
  },
  HandleLogout: async (req,res) =>{
    req.session.destroy();
    return res.redirect("/");
  }
  
};

module.exports = UserController;

