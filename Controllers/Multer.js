// multer.js
const multer = require('multer');

// Define the storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination directory where uploaded images will be stored
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded image (you can customize this)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Create a Multer instance with the defined storage
const upload = multer({ storage });

module.exports = upload;
