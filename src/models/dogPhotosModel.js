const mongoose = require('mongoose');

const dogPhotoSchema = new mongoose.Schema({
    imagePath: { type: String, required: true },
    imageData: {
        data: Buffer, 
        contentType: String 
    },
    date: { type: Date, default: Date.now },
});

const DogPhoto = mongoose.model('DogPhoto', dogPhotoSchema);

module.exports = DogPhoto;
