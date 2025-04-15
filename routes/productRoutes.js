// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/au_middleware');
// const upload = require('../middleware/upload');
// const { createProduct } = require('../controllers/productcontroller');

// // Single image upload
// router.post('/single', auth, upload.single('image'), createProduct);

// // Multiple image upload
// router.post('/multiple', auth, upload.array('images', 5), createProduct);

// module.exports = router;



const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productcontroller');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Routes
router.post('/single', upload.single('image'), createProduct);
router.post('/multiple', upload.array('images', 5), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', upload.array('images', 5), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
