// api/Routes/ImageRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); 
const { uploadImage, getAllImages, getImageById, deleteImage } = require('../Controller/ImageController');

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getAllImages);
router.get('/:id', getImageById);
router.delete('/:id', deleteImage);

module.exports = router;