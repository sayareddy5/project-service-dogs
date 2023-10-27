const DogPhoto = require("../models/dogPhotosModel");
const DogDetails = require("../models/dogDetailsModel");
const VolunteerRequests = require("../models/volunteerForm");
const TrainingApplications = require("../models/trainingForm");
const User = require("../models/User");
const fs = require('fs');


const AdminController = {
    index: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('admin/admin-home.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Home", error:  null});
    },

    adminLogin: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
       
        console.log(req.session.user)
        res.render('admin/admin-login.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Login", error: null});
    },

    adminRegister: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('admin/admin-register.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Register",error: null});
    },

    HandleLogout: async (req,res) =>{
        req.session.destroy();
        return res.redirect("/admin");
    },

    HandleLoginForm: async (req, res) => {

        console.log("in handling login")
        console.log(req.body)
        const { username, password } = req.body;
        const user = await User.findOne({ username })

        console.log("admin-detail",user)
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
            console.log("in success",req.session.user)
            return res.redirect("/admin");

        }else{
            console.log("failed login")
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

            console.log("admin-data-registration", req.body)
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
        
        console.log("in dog upload function",req.session.user)
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
        fs.readFile(imagePath, (err, imageBuffer) => {
            if (err) {
                console.error('Error reading image file:', err);
            } else {
                // Create a new DogDetails document with the image path, image buffer, and other data
                const newDogPhoto = new DogPhoto({
                    imagePath: imagePath,
                    imageData: {
                        data: imageBuffer,
                        contentType: 'image/jpeg' // Set the appropriate content type of your image
                    }
                });
        
                // Save the DogDetails document to MongoDB
                newDogPhoto.save()
                    .then(savedDog => {
                        console.log('Dog details saved:', savedDog);
                    })
                    .catch(error => {
                        console.error('Error saving dog details:', error);
                    });
            }
        });

            
        return res.redirect("/admin")
    },
    dogDetailsUpload: (req, res) => {
        
        
        const { breed, age, service, status } = req.body;
        const imagePath = req.file.path
        fs.readFile(imagePath, (err, imageBuffer) => {
            if (err) {
                console.error('Error reading image file:', err);
            } else {
                // Create a new DogDetails document with the image path, image buffer, and other data
                const newDogDetails = new DogDetails({
                    imagePath: imagePath,
                    imageData: {
                        data: imageBuffer,
                        contentType: 'image/jpeg' // Set the appropriate content type of your image
                    },
                    breed: breed,
                    age: age,
                    inService: service,
                    status: status
                });
        
                // Save the DogDetails document to MongoDB
                newDogDetails.save()
                    .then(savedDog => {
                        console.log('Dog details saved:', savedDog);
                    })
                    .catch(error => {
                        console.error('Error saving dog details:', error);
                    });
            }
        });
        return res.redirect("/admin")
}};

module.exports = AdminController
