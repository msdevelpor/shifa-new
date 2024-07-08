const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/Attachments'); // Store uploaded files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Generate unique filenames
    },
  });
  
  const upload = multer({ storage });
  