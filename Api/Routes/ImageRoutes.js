// Api/Routes/ImageRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); 
const { uploadImage, getAllImages, getImageById } = require('../Controller/ImageController');

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getAllImages);
router.get('/:id', getImageById);

module.exports = router;