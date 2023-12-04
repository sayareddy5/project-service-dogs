// ----------handling file uploads ----------------

require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const {S3} = require("./amazonS3");


const profileImageUpload = multer({
storage: multerS3({
    s3: S3,
    bucket: process.env.S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
    cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
    cb(null, 'profile/' + Date.now().toString() + '-' + file.originalname);
    },
    cacheControl: 'max-age=2592000',
}),
});

  // Multer storage configuration for feed images
const feedImageUpload = multer({
storage: multerS3({
    s3: S3,
    bucket: process.env.S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
    cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
    cb(null, 'feed/' + Date.now().toString() + '-' + file.originalname);
    },
    cacheControl: 'max-age=2592000',
}),
});

const AdminImageUpload = multer({
storage: multerS3({
    s3: S3,
    bucket: process.env.S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
    cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
    cb(null, 'admin/' + Date.now().toString() + '-' + file.originalname);
    },
    cacheControl: 'max-age=2592000',
}),
});


module.exports = {profileImageUpload, feedImageUpload,AdminImageUpload};