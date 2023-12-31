const mongoose = require('mongoose');

const volunteerFormSchema = new mongoose.Schema({
    volunteerOptions: [{ type: String, required: true }],
    firstName: {type: String,required: true},
    lastName: {type: String,required: true},
    school: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    occupation: { type: String, required: true },
    isHighSchoolStudent: {type: String, default: "No" },
    age: { type: Number },
    availability: [{ type: String }],
    requestDate: { type: Date, default: Date.now },
    acceptedStatus: {type: Boolean, default: false}
}, {timestamps : true});

const VolunteerForm = mongoose.model('VolunteerForm', volunteerFormSchema);

module.exports = VolunteerForm;