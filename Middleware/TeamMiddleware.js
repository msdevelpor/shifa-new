const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/Team'); // Destination directory for uploaded images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Rename the uploaded file
    },
  });
  
const upload = multer({ storage: storage });

module.exports = upload;
