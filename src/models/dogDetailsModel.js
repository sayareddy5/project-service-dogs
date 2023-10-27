const mongoose = require('mongoose');


const dogDetailsSchema = new mongoose.Schema({
    imagePath: { type: String, required: true },
    imageData: {
        data: Buffer, 
        contentType: String 
    },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    inService: { type: Number, required: true },
    status: { type: String, enum: ['available', 'notAvailable'], required: true }
});

// Create a Mongoose model
const DogDetails = mongoose.model('DogDetails', dogDetailsSchema);

module.exports = DogDetails;