const mongoose = require('mongoose');

const dogPhotoSchema = new mongoose.Schema({
    imagePath: { type: String, required: true },
    imageData: {
        data: Buffer, 
        contentType: String 
    },
});

const DogPhoto = mongoose.model('DogPhoto', dogPhotoSchema);

module.exports = DogPhoto;
