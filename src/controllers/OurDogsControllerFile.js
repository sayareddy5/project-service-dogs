const ApplicationForm = require("../models/trainingForm")
const DogPhotos = require("../models/dogPhotosModel")
const DogDetails = require("../models/dogDetailsModel")
const OurDogsController = {
    acquireDog: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        
        res.render('ourDogs/acquireDog.ejs',{authorized, username, title: "Acquire Dog"});
    },
    dogJourney: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
      
        res.render('ourDogs/dogJourney.ejs',{authorized, username, title: "Dog Journey"});
    },
    assistanceDogs: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
      
        res.render('ourDogs/assistance-dog.ejs',{authorized, username, title: "Assistance Dogs"});
    },
    applyForDogs: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
       
        res.render('ourDogs/apply-for-dog.ejs',{authorized, username, title: "Apply for Dog"});
    },
    dogsList: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        const totalDogs = await DogDetails.find({})


        res.render('ourDogs/dogsList.ejs',{authorized, username, title: "Total Dogs", totalDogs : totalDogs});
    },
    photoGallery: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        const totalDogPhotos = await DogPhotos.find({})
        res.render('ourDogs/photoGallery.ejs',{authorized, username, title: "Photo Gallery", totalDogPhotos: totalDogPhotos});
    },
    realityGuide: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        
        res.render('ourDogs/realityGuideDog.ejs',{authorized, username, title: "Realities of a Guide Dog"});
    },
    trainingApplication: (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        
        
        res.render('ourDogs/trainingApplication.ejs',{authorized, username, title: "Training Application"});
    },
    handleTrainingForm: async (req,res) => {
        try {
        const formData = req.body;
        
        const applicationForm = new ApplicationForm(formData);

        await applicationForm.save();

        res.status(200).json({ success: true });
        } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ success: false, error: 'Form submission failed' });
        }
    }
};


module.exports = OurDogsController