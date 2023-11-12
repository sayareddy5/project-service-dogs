const express = require('express');
const router = express.Router();
const VolunteerController = require('../controllers/VolunteerControllerFile')
// const userController = require('../controllers/userControllerFile');

// router.get('/', userController.getUserList);

router.get('/volunteering',VolunteerController.volunteering);
router.get('/volunteer-application',VolunteerController.showVolunteerApplication);
router.post('/submit-volunteer-form',VolunteerController.HandleVolunteerForm);

module.exports = router;