// ----------handling file uploads ----------------
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store uploaded files in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename uploaded files with timestamp
    }
});

const upload = multer({ storage: storage });

module.exports = upload