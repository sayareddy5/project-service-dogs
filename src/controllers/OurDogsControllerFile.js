const ApplicationForm = require("../models/trainingForm")
const DogPhotos = require("../models/dogPhotosModel")
const DogDetails = require("../models/dogDetailsModel")
const User = require("../models/User")

const OurDogsController = {
    acquireDog: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        res.render('ourDogs/acquireDog.ejs',{authorized, username, title: "Acquire Dog",imageUrl:userImageUrl});
    },
    dogJourney: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        res.render('ourDogs/dogJourney.ejs',{authorized, username, title: "Dog Journey",imageUrl:userImageUrl});
    },
    assistanceDogs: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
      
        res.render('ourDogs/assistance-dog.ejs',{authorized, username, title: "Assistance Dogs",imageUrl:userImageUrl});
    },
    applyForDogs: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        res.render('ourDogs/apply-for-dog.ejs',{authorized, username, title: "Apply for Dog",imageUrl:userImageUrl});
    },
    
    dogsList: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        const totalDogs = await DogDetails.find({});
        res.render('ourDogs/dogsList.ejs',{authorized, username, title: "Total Dogs", totalDogs : totalDogs, imageUrl:userImageUrl});
    },
    photoGallery: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        const totalDogPhotos = await DogPhotos.find({})
        res.render('ourDogs/photoGallery.ejs',{authorized, username, title: "Photo Gallery", totalDogPhotos: totalDogPhotos,imageUrl:userImageUrl});
    },
    realityGuide: async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        res.render('ourDogs/realityGuideDog.ejs',{authorized, username, title: "Realities of a Guide Dog",imageUrl:userImageUrl});
    },
    trainingApplication:async (req, res) => {
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        res.render('ourDogs/trainingApplication.ejs',{authorized, username, title: "Training Application",imageUrl:userImageUrl});
    },
    handleTrainingForm: async (req,res) => {
        try {
            const formData = req.body;
            
            const applicationForm = new ApplicationForm(formData);

            await applicationForm.save();
            res.status(200).json({ success: true });
        } catch (error) {
        
            res.status(500).json({ success: false, error: 'Form submission failed' });
        }
    },
    fullDogsList : async (req, res) => {
        try {
            const totalDogs = await DogDetails.find({})
            res.json(totalDogs);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    filterDogs: async(req, res) => {
        const { breed, inService, status } = req.query;
        let filter = {};
        
        if (breed) {
            

            filter.breed = breed.toLowerCase();
        }
        
        if (inService) {
            
            filter.inService = { $lte: inServiceValue };
            
            
        }
        
        if (status) {

            filter.status = status;
        }
        

        try {
            const filteredDogs = await DogDetails.find(filter);
            
            res.json(filteredDogs);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};


module.exports = OurDogsController