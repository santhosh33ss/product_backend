import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set the upload path
const uploadPath = path.join(__dirname, '../../uploads/');

// Ensure the directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); // safer with recursive
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage });


