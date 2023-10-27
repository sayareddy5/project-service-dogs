const mongoose = require('mongoose');

const applicationFormSchema = new mongoose.Schema({
    receiveMethod: { type: String, required: true },
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    healthInsurance: { type: String },
    dob: { type: Date, required: true },
    registeredBlind: { type: String, required: true },
    lowVisionAssessment: { type: String, required: true },
    caneUser: { type: String, required: true },
    guideDogExperience: { type: String, required: true },
    otherSchools: { type: String, required: true },
    canadianGuideDogs: { type: String, required: true },
    privacyPolicyAgree: { type: Boolean, required: true },
    applicationDate: { type: Date, default: Date.now },
    acceptedStatus: {type: Boolean, default: false}
}, {timestamps : true});

const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);

module.exports = ApplicationForm;
