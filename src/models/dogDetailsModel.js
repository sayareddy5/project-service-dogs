const mongoose = require('mongoose');


const dogDetailsSchema = new mongoose.Schema({
    imageUrl: { type: String },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    inService: { type: Number, required: true },
    status: { type: String, enum: ['available', 'notAvailable'], required: true },
    date: { type: Date, default: Date.now },

});

const DogDetails = mongoose.model('DogDetails', dogDetailsSchema);

module.exports = DogDetails;