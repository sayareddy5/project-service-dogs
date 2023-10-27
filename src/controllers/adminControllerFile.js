const DogPhoto = require("../models/dogPhotosModel")
const DogDetails = require("../models/dogDetailsModel")
const fs = require('fs');


const AdminController = {
    index: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('admin/admin-home.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Home"});
    },
    adminLogin: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('admin/admin-login.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Login"});
    },
    adminRegister: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('admin/admin-register.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Admin Register"});
    },
    volunteerRequests: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('admin/volunteer-requests.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Volunteer Requests"});
    },
    trainingApplications: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('admin/training-applications.ejs',{layout: 'baseTemplates/admin',authorized, username, title: "Training Applications"});
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
