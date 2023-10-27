const express = require('express');
const router = express.Router();
const OurDogsController = require('../controllers/OurDogsControllerFile')
// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/photo-gallery',OurDogsController.photoGallery);
router.get('/total-dogs-list',OurDogsController.dogsList);
router.get('/acquire-a-dog',OurDogsController.acquireDog);
router.get('/guide-dog-journey',OurDogsController.dogJourney);
router.get('/realities-of-a-guide-dog',OurDogsController.realityGuide);

router.get('/training-application',OurDogsController.trainingApplication);
router.post('/training-application',OurDogsController.handleTrainingForm);


console.log("In Our Dogs Routes")
module.exports = router;

console.log("exported router")