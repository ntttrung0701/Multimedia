const express = require('express');
const multer = require('multer');
const path = require('path');
const VideoController = require('../Controller/VideoController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/videos'));
  },
  filename: (req, file, cb) => {
    cb(null, '${Date.now()}-${file.originalname}');
  },
});

const upload = multer({ storage });

// Định nghĩa các endpoint API
router.post('/videos/upload', videoController.uploadVideo);
router.get('/', VideoController.getAllVideos);
router.get('/:id', VideoController.getVideoById);
router.get('/stream/:id', VideoController.streamVideo);
router.post('/cut', VideoController.cutVideo);
router.get('/download/:id', VideoController.downloadVideo);

module.exports = router;
