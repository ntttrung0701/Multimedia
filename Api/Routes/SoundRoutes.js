const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { uploadSound, getAllSounds } = require('../Controller/SoundController');

router.post('/upload', upload.single('sound'), uploadSound);
router.get('/', getAllSounds);

module.exports = router;