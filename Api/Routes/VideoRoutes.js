const express = require('express');
const multer = require('multer');
const VideoController = require('../Controller/VideoController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/download/:videoPath', VideoController.downloadVideo);
router.post('/upload', upload.single('video'), VideoController.uploadVideo);
router.get('/', VideoController.getAllVideos);
router.get('/:id', VideoController.getVideoById);
router.post('/cut', VideoController.cutVideo);

module.exports = router;