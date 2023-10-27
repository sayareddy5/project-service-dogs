const mongoose = require('mongoose');

const volunteerFormSchema = new mongoose.Schema({
    volunteerOptions: [{ type: String, required: true }],
    name: { type: String, required: true },
    school: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    occupation: { type: String, required: true },
    isHighSchoolStudent: {type: String, default: "No" },
    age: { type: Number },
    availability: [{ type: String }]
});

const VolunteerForm = mongoose.model('VolunteerForm', volunteerFormSchema);

module.exports = VolunteerForm;