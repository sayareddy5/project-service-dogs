const ApplicationForm = require("../models/trainingForm")
const DogPhotos = require("../models/dogPhotosModel")
const DogDetails = require("../models/dogDetailsModel")
const User = require("../models/User")

const OurDogsController = {
    acquireDog: async (req, res) => {

        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        // render page with required details        
        res.render('ourDogs/acquireDog.ejs',{authorized, username, title: "Acquire Dog",imageUrl:userImageUrl});
    },
    dogJourney: async (req, res) => {

        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        // render page with required details
        res.render('ourDogs/dogJourney.ejs',{authorized, username, title: "Dog Journey",imageUrl:userImageUrl});
    },
    assistanceDogs: async (req, res) => {

        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        // render page with required details
        res.render('ourDogs/assistance-dog.ejs',{authorized, username, title: "Assistance Dogs",imageUrl:userImageUrl});
    },
    applyForDogs: async (req, res) => {

        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        // render page with required details
        res.render('ourDogs/apply-for-dog.ejs',{authorized, username, title: "Apply for Dog",imageUrl:userImageUrl});
    },
    
    dogsList: async (req, res) => {

        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        // get all the dogDetails data
        const totalDogs = await DogDetails.find({});

        // render page with required details
        res.render('ourDogs/dogsList.ejs',{authorized, username, title: "Total Dogs", totalDogs : totalDogs, imageUrl:userImageUrl});
    },
    photoGallery: async (req, res) => {

        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        // get all the images
        const totalDogPhotos = await DogPhotos.find({})

        // render page with required details
        res.render('ourDogs/photoGallery.ejs',{authorized, username, title: "Photo Gallery", totalDogPhotos: totalDogPhotos,imageUrl:userImageUrl});
    },
    realityGuide: async (req, res) => {

        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null

        // render page with required details
        res.render('ourDogs/realityGuideDog.ejs',{authorized, username, title: "Realities of a Guide Dog",imageUrl:userImageUrl});
    },
    trainingApplication:async (req, res) => {
        // get the user details if the user exists in  req.session  object
        const authorized = req.session.user && req.session.user.authorized === true;
        const username = req.session.user ? req.session.user.username : null;
        const userImageUrl = req.session.user ? req.session.user.imageUrl : null
        
        // render page with required details
        res.render('ourDogs/trainingApplication.ejs',{authorized, username, title: "Training Application",imageUrl:userImageUrl});
    },
    handleTrainingForm: async (req,res) => {
        try {
            // get the total from  data from req.body
            const formData = req.body;
            
            // cretae a new applicaiton instance
            const applicationForm = new ApplicationForm(formData);

            // save the application
            await applicationForm.save();
            res.status(200).json({ success: true });

        } catch (error) {
        
            res.status(500).json({ success: false, error: 'Form submission failed' });
        }
    },
    fullDogsList : async (req, res) => {
        try {
            // get all the dog details
            const totalDogs = await DogDetails.find({})

            // send a json reponse of total dog detials data
            res.json(totalDogs);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    filterDogs: async(req, res) => {

        // get the filtering options from the req.query 
        const { breed, inService, status } = req.query;

        // create an empty filter object to search on the dogDetails Model
        let filter = {};
        
        if (breed) {
            
            // set the breed to lower case and store in filter object
            filter.breed = breed.toLowerCase();
        }
        
        if (inService) {
            
            // attach a lessthan or equal method and store in the filterobject
            filter.inService = { $lte: inService };
            
            
        }
        
        if (status) {

            // save the status in filter object
            filter.status = status;
        }
        

        try {

            // get all the dogs based on the filter object
            const filteredDogs = await DogDetails.find(filter);
            
            // send the filtered dogs in  json  response
            res.json(filteredDogs);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};


module.exports = OurDogsController