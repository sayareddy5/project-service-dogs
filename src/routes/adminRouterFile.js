const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminControllerFile')
const upload = require("../../config/multerC")

router.get('/',AdminController.index);
router.get('/login',AdminController.adminLogin);
router.get('/register',AdminController.adminRegister);
router.get('/volunteer-requests',AdminController.volunteerRequests);
router.get('/training-applications',AdminController.trainingApplications);
router.post('/dog-photos',upload.single('image'),AdminController.dogImageUpload);
router.post('/dog-details',upload.single('image'),AdminController.dogDetailsUpload);

console.log("In Admin Routes")
module.exports = router;