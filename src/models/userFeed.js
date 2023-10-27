const mongoose = require('mongoose');
const User = require("../models/User")

const feedSchema = new mongoose.Schema({
    image: {
        data: Buffer, // Store image data as a Buffer
        contentType: String // Store content type (e.g., 'image/png', 'image/jpeg')
    },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    datePosted: { type: Date, default: Date.now },
    totalLikes: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, required: true },
        datePosted: { type: Date, default: Date.now }
    }]
} , {timestamps : true});

const Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;
