const mongoose = require('mongoose');

const dogPhotoSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const DogPhoto = mongoose.model('DogPhoto', dogPhotoSchema);

module.exports = DogPhoto;
