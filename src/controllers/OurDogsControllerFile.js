const ApplicationForm = require("../models/trainingForm")
const OurDogsController = {
    acquireDog: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('ourDogs/acquireDog.ejs',{authorized, username, title: "Acquire Dog"});
    },
    dogJourney: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('ourDogs/dogJourney.ejs',{authorized, username, title: "Dog Journey"});
    },
    assistanceDogs: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('ourDogs/assistance-dog.ejs',{authorized, username, title: "Assistance Dogs"});
    },
    applyForDogs: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('ourDogs/apply-for-dog.ejs',{authorized, username, title: "Apply for Dog"});
    },
    dogsList: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('ourDogs/dogsList.ejs',{authorized, username, title: "Total Dogs"});
    },
    photoGallery: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('ourDogs/photoGallery.ejs',{authorized, username, title: "Photo Gallery"});
    },
    realityGuide: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('ourDogs/realityGuideDog.ejs',{authorized, username, title: "Realities of a Guide Dog"});
    },
    trainingApplication: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        console.log(req.session.user)
        res.render('ourDogs/trainingApplication.ejs',{authorized, username, title: "Training Application"});
    },
    handleTrainingForm: async (req,res) => {
        try {
        const formData = req.body;
        console.log("req-body", req.body);

        // Create a new ApplicationForm instance using the form data
        const applicationForm = new ApplicationForm(formData);

        // Save the form data to the database
        await applicationForm.save();

        // Send a success response to the client
        res.status(200).json({ success: true });
        } catch (error) {
        // Handle errors here (e.g., validation errors, database errors)
        console.error('Form submission error:', error);
        res.status(500).json({ success: false, error: 'Form submission failed' });
        }
    }
};


module.exports = OurDogsController