const express = require('express');
const router = express.Router();
const OurDogsController = require('../controllers/OurDogsControllerFile')
const isLoggedIn = require("../../helpers/userAuth")

// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/photo-gallery',OurDogsController.photoGallery);
router.get('/breeds/total-breeds',OurDogsController.getAllBreeds);
router.get('/total-dogs-list',OurDogsController.dogsList);
router.get('/total-dogs-list/all',OurDogsController.fullDogsList);
router.get('/total-dogs-list/filter',OurDogsController.filterDogs);
router.get('/acquire-a-guide-dog',OurDogsController.acquireDog);
router.get('/guide-dog-journey',OurDogsController.dogJourney);
router.get('/realities-of-a-guide-dog',OurDogsController.realityGuide);
router.get('/apply-for-dog',OurDogsController.applyForDogs);
router.get('/assistance-dogs',OurDogsController.assistanceDogs);
router.get('/training-application',isLoggedIn, OurDogsController.trainingApplication);
router.post('/training-application',OurDogsController.handleTrainingForm);

module.exports = router;
