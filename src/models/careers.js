const mongoose = require('mongoose');

const JobDetailsSchema = new mongoose.Schema({
    role: {type: String, required: true,},
    jobDescription: {type: String,required: true,},
    location: {type: String,required: true,},
    contact: {type: String,required: true,},
});

const CarrerModel= mongoose.model('CarrerModel', JobDetailsSchema);

module.exports = CarrerModel;