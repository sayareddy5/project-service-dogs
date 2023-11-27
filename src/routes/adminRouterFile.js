const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminControllerFile')
const {AdminImageUpload} = require("../../config/multerC")
const AdminLoggedIn = require("../../helpers/adminAuth")

router.get('/',AdminLoggedIn,AdminController.index);

router.get('/login',AdminController.adminLogin);

router.get('/register',AdminController.adminRegister);

router.get('/logout',AdminController.HandleLogout);

router.get('/career-list', AdminController.getJobDetails);
router.post('/career-list', AdminController.saveJobDetails);

router.post('/login',AdminController.HandleLoginForm);

router.post('/register',AdminController.handleRegistration);

router.get('/volunteer-requests',AdminLoggedIn, AdminController.volunteerRequests);

router.get('/training-applications',AdminLoggedIn, AdminController.trainingApplications);

router.get('/upload-dog-content',AdminLoggedIn, AdminController.uploadDogContent);

router.post('/dog-photos',AdminLoggedIn, AdminImageUpload.single('image'),AdminController.dogImageUpload);

router.post('/dog-details',AdminLoggedIn, AdminImageUpload.single('image'),AdminController.dogDetailsUpload);

module.exports = router;