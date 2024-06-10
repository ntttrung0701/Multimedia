const express = require('express');
const multer = require('multer');
const path = require('path');
const VideoController = require('../Controller/VideoController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/video'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // Giới hạn kích thước tệp là 100MB
});

// Định nghĩa các endpoint API
router.post('/videos/upload', upload.single('video'), VideoController.uploadVideo);
router.get('/videos', VideoController.getAllVideos);
router.get('/:id', VideoController.getVideoById);
router.get('/stream/:id', VideoController.streamVideo);
router.post('extract-audio',VideoController.extractAudio);
router.post('/cut', VideoController.cutVideo);
router.get('/download/:id', VideoController.downloadVideo);

module.exports = router;