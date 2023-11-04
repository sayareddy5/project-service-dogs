const mongoose = require('mongoose');
const User = require("../models/User")


const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    datePosted: { type: Date, default: Date.now },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Feed', required: true },
}, { timestamps: true });

const likeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Feed', required: true },
}, { timestamps: true });


const feedSchema = new mongoose.Schema({
    imageUrl: { type: String },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    datePosted: { type: Date, default: Date.now },
    likes: [likeSchema], 
    comments: [commentSchema],
    totalLikes: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
} , {timestamps : true});

const Feed = mongoose.model('Feed', feedSchema);
const Like = mongoose.model('Like', likeSchema);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = {
    Feed, Like, Comment
};
