const DogPhoto = require("../models/dogPhotosModel");
const DogDetails = require("../models/dogDetailsModel");
const VolunteerRequests = require("../models/volunteerForm");
const TrainingApplications = require("../models/trainingForm");
const User = require("../models/User");
const {S3, deleteObjectFromS3} = require("../../config/amazonS3");
const CarrerModel = require("../models/careers")


const AdminController = {

    index: async (req, res) => {

        // get details from the session of the current user of exists
        const authorized = req.session.user && req.session.user.authorized === true;
        var username = req.session.user ? req.session.user.username : null;
        
        try{
            // check if the user exists in our database
            const userObject = await User.findOne({username})
            
            // if user exists and is not admin user, set username to null
            if(!userObject.isAdmin){
                username = null
            }
        }catch(error){
            console.log("error")
        }

        //render page with the required details to display
        return res.render('admin/admin-home.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Home", error:  null});
    },

    adminLogin: async (req, res) => {
        // get details from the session of the current user of exists
        const authorized = req.session.user && req.session.user.authorized === true;
        var username = req.session.user ? req.session.user.username : null;
        
        try{
            // check if the user exists in our database
            const userObject = await User.findOne({username : username})
            // if user exists and is not admin user, set username to null
            if(userObject){

                if(!userObject.isAdmin){
                    username = null
        
                }
            }
        }catch(error){
            console.log(error)
        }
        //render page with the required details to display
        return res.render('admin/admin-login.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Login", error: null});
    },

    adminRegister: async (req, res) => {
        // get details from the session of the current user of exists
        const authorized = req.session.user && req.session.user.authorized === true;
        var username = req.session.user ? req.session.user.username : null;
        
        try{
            // check if the user exists in our database
            const userObject = await User.findOne({username})
            // if user exists and is not admin user, set username to null
            if(userObject){

                if(!userObject.isAdmin){
                    username = null
        
                }
            }
        }catch(error){
            console.log("error while showing admin register page",error);
        }
        //render page with the required details to display
        return res.render('admin/admin-register.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Register",error: null});
    },

    HandleLogout: async (req,res) =>{
        // destroy the current session
        req.session.destroy();
        return res.redirect("/admin");
    },

    HandleLoginForm: async (req, res) => {

        // get username and password from the req.body object
        const { username, password } = req.body;
        // get the user based on username
        const user = await User.findOne({ username })

        
        if(!user){
            //render page with the required details to display
            return res.render('admin/admin-login.ejs', {
            authorized: false,
            username: null,
            error: 'User does not exist',
            title: " Admin Login",
            layout: 'baseTemplates/admin',
            })
        }
        
        if(password == user.password){
            
            // if the password matches, set the current user in the req.session object
            req.session.user = {
            id: user._id,
            username: user.username,
            authorized: true,
            }
            
            // if user redirect to admin page
            return res.redirect("/admin");

        }else{
            
            //render page with the required details to display
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

            // get details from req.body
            const { username, email, password, confirmpassword } = req.body;

            // if passowrd and confirmpassword not same
            if( password != confirmpassword ){

                // render the admin register page again
            return res.status(400).render("admin/admin-register", {
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

                // If the user exists with the given email or username, send error message and render user register page
                return res.status(400).render("admin/admin-register", {
                authorized: false,
                username: null,
                error: 'User already exists',
                title: "sign up",
                layout: 'baseTemplates/admin',
                });
            }
            
            // set isAdmin to true to make them the admin user
            const isAdmin = true;
            // or create a new user 
            const newUser = new User({ username, email, password, isAdmin });
            // save the admin user
            await newUser.save();
            
            return res.redirect("/admin/login")
        } catch (err) {
            console.error(err);
            return res.status(500).send('Error registering user');
        }
        },

    uploadDogContent: async (req, res) => {

        // get details from the session of the current user of exists
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        // render page with required details to display
        res.render('admin/dog-upload.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Upload Dog Content"});
    },

    volunteerRequests: async (req, res) => {

        // get details from the session of the current user of exists
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        // fetch requests based on the oldest date
        const total_requests = await VolunteerRequests.find().sort({ requestDate: -1 });

        // render page with required details to display
        res.render('admin/volunteer-requests.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Volunteer Requests", volunteerRequests : total_requests});
    },

    trainingApplications: async (req, res) => {

        // get details from the session of the current user of exists
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;

        // fetch applications based on the oldest date
        const training_applications = await TrainingApplications.find().sort({ applicationDate: -1 });

        res.render('admin/training-applications.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Training Applications",trainingRequests: training_applications});
    },

    dogImageUpload: (req, res) => {
        
        // get the image path from the req.file object
        
        
        try{
            const imagePath = req.file.location
            // console.log(imagePath)
            // create a new dogphoto instance
            const newDogPhoto = new DogPhoto({
                imageUrl: imagePath,
            });
            
            // save the dog photo
            newDogPhoto.save()
            
        
            return res.redirect("/admin")
        }catch(error){
            console.log("error occured while saving dog image",error)
            return res.json({"success": "false", "message": "Error occured while uploading, if image is not provided, please provide image while uploading"})
        }

    },

    dogDetailsUpload: (req, res) => {
        
        // get the dog detiails from the req.body
        const { breed, age, service, status } = req.body;
        // get image path from req.file object
        
        
        try{
            let dogImagePath = ''
            if(req.file){
                dogImagePath = req.file.location
            }
            // create a new dogDetials instance
            const newDogDetails = new DogDetails({
                imageUrl: dogImagePath,
                breed: breed.toLowerCase(),
                age: age,
                inService: service,
                status: status
            });
            // save the instance
            newDogDetails.save()
            return res.redirect("/admin")
        }catch(error){
            
            console.log("error occured while saving dog image",error)
            return res.json({"success": "false", "message": "Error occured while uploading, Please provide necessary details and try again"})
        }
    },
    getJobDetails: async (req, res) =>{
        const authorized = req.session.user && req.session.user.authorized === true;
        var username = req.session.user ? req.session.user.username : null;
        try {

            const allJobDetails = await CarrerModel.find();
            res.render('admin/admin-career.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Service Dogs Careers",allJobDetails});
            } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    saveJobDetails: async (req, res) =>{
        const authorized = req.session.user && req.session.user.authorized === true;
        var username = req.session.user ? req.session.user.username : null;
        try {
            // create a new document using the model
            const newJobDetails = new CarrerModel({
                role: req.body.role,
                jobDescription: req.body.jobDescription,
                location: req.body.location,
                contact: req.body.contact,
            });
        
            // save the document to the database
            await newJobDetails.save();

            const allJobDetails = await CarrerModel.find();
            res.render('admin/admin-career.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Service Dogs Careers",allJobDetails});
            } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    
};

module.exports = AdminController
