const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); 
const { uploadImage, getAllImages, getImageById, deleteImage, saveEditedImage } = require('../Controller/ImageController');

router.post('/upload', upload.single('image'), uploadImage);
router.post('/save-edited', saveEditedImage); // Route cho việc lưu ảnh đã chỉnh sửa
router.get('/', getAllImages);
router.get('/:id', getImageById);
router.delete('/:id', deleteImage);

module.exports = router;