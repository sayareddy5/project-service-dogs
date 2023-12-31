const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    
    honoreeName: String,
    honoreeMessage: String,
    donationType: {
        type: String,
        enum: ['personal', 'organization'],
        required: true
    },
    email : {type: String, required: true},
    firstName: String,
    lastName: String,
    organizationName: String,
    emailPermission: {type: Boolean, default: false},
    mailPermission: {type: Boolean, default: false},

});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
