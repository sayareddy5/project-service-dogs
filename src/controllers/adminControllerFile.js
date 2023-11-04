const DogPhoto = require("../models/dogPhotosModel");
const DogDetails = require("../models/dogDetailsModel");
const VolunteerRequests = require("../models/volunteerForm");
const TrainingApplications = require("../models/trainingForm");
const User = require("../models/User");


const AdminController = {
    index: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        var username = req.session.user ? req.session.user.username : null;
        
        try{

            const userObject = await User.findOne({username})
           
            console.log(userObject)
            console.log(userObject.isAdmin)
            if(!userObject.isAdmin){
                username = null
    
                console.log("in index inside",username);
            }
        }catch(error){
            console.log("error")
        }
        return res.render('admin/admin-home.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Home", error:  null});
    },

    adminLogin: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        var username = req.session.user ? req.session.user.username : null;
        
        console.log("username", username)
        try{

            const userObject = await User.findOne({username : username})
           
            console.log(userObject)
            console.log(userObject.isAdmin)
            if(!userObject.isAdmin){
                username = null
    
                console.log("in login inside",username);
            }
        }catch(error){
            console.log(error)
        }
        
        return res.render('admin/admin-login.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Login", error: null});
    },

    adminRegister: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        var username = req.session.user ? req.session.user.username : null;
        
        try{

            const userObject = await User.findOne({username})
           
            console.log(userObject)
            console.log(userObject.isAdmin)
            if(!userObject.isAdmin){
                username = null
    
                console.log("in register inside",username);
            }
        }catch(error){
            console.log("error")
        }

        console.log("register after if",username);
        return res.render('admin/admin-register.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Register",error: null});
    },

    HandleLogout: async (req,res) =>{
        req.session.destroy();
        return res.redirect("/admin");
    },

    HandleLoginForm: async (req, res) => {

        
        const { username, password } = req.body;
        const user = await User.findOne({ username })

        
        if(!user){
            return res.render('admin/admin-login.ejs', {
            authorized: false,
            username: null,
            error: 'User does not exist',
            title: " Admin Login",
            layout: 'baseTemplates/admin',
            })
        }
        
        if(password == user.password){
            
            req.session.user = {
            id: user._id,
            username: user.username,
            authorized: true,
            }
           
            return res.redirect("/admin");

        }else{
           
            return res.render('admin/admin-login.ejs', {
            authorized: false,
            username: null,
            error: 'Invalid credentials',
            title: 'Loppgin',
            layout: 'baseTemplates/admin',
        });
        }
    },
    handleRegistration: async (req, res) => {
    
        try {

            
            const { username, email, password, confirmpassword } = req.body;
            if( password != confirmpassword ){
            return res.status(400).render("user/register", {
                authorized: false,
                username: null,
                error: 'Passwords does not match',
                title: "Admin sign up",
                layout: 'baseTemplates/admin',
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
                title: "sign up",
                layout: 'baseTemplates/admin',
                });
            }
            const isAdmin = true;
            // or create a new user 
            const newUser = new User({ username, email, password,isAdmin });
            await newUser.save();
        
            // res.redirect('/user/success');
            return res.redirect("/admin/login")
        } catch (err) {
            console.error(err);
            return res.status(500).send('Error registering user');
        }
        },
    uploadDogContent: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        
        res.render('admin/dog-upload.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Upload Dog Content"});
    },
    volunteerRequests: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        const total_requests = await VolunteerRequests.find().sort({ requestDate: 1 });

        res.render('admin/volunteer-requests.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Volunteer Requests", volunteerRequests : total_requests});
    },
    trainingApplications: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const training_applications = await TrainingApplications.find().sort({ applicationDate: 1 });

        res.render('admin/training-applications.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Training Applications",trainingRequests: training_applications});
    },
    dogImageUpload: (req, res) => {
        
        
        const imagePath = req.file.path
        
        try{
            
            const newDogPhoto = new DogPhoto({
                imageUrl: imagePath,
            });
    
            newDogPhoto.save()
                
            return res.redirect("/admin")
        }catch(error){
            console.log("error occured while saving dog image",error)
        }

    },
    dogDetailsUpload: (req, res) => {
        
        
        const { breed, age, service, status } = req.body;
        const imagePath = req.file.path
        
        try{
            
            const newDogDetails = new DogDetails({
                imageUrl: imagePath,
                breed: breed,
                age: age,
                inService: service,
                status: status
            });

            newDogDetails.save()
            return res.redirect("/admin")
        }catch(error){
            console.log("error occured while saving dog image",error)
        }
                
          
}};

module.exports = AdminController
