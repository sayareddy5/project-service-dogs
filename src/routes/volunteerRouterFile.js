const express = require('express');
const router = express.Router();
const VolunteerController = require('../controllers/VolunteerControllerFile')
const isLoggedIn = require("../../helpers/userAuth")
// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/volunteering',VolunteerController.volunteering);
router.get('/volunteer-application',isLoggedIn,VolunteerController.showVolunteerApplication);
router.post('/submit-volunteer-form',VolunteerController.HandleVolunteerForm);

module.exports = router;