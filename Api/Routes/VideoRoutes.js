const express = require('express');
const router = express.Router();
const multer = require('multer'); // Dùng để xử lý upload file

const VideoController = require('../Controller/VideoController');

// Thiết lập storage cho Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Khởi tạo Multer với storage đã định nghĩa
const upload = multer({ storage: storage });

// Route lấy tất cả video
router.get('/videos', VideoController.getAllVideos);

// Route lấy video theo ID
router.get('/videos/:id', VideoController.getVideoById);

// Route upload video. Sử dụng Multer với key 'video'
router.post('/videos', upload.single('video'), VideoController.uploadVideo);

// Route cắt video
router.post('/videos/cut', VideoController.cutVideo);

// Route xem video
router.get('/videos/view/:filename', VideoController.viewVideo);

// Route download video
router.get('/videos/download/:id', VideoController.downloadVideo);

// Bạn có thể thêm các route khác như updateVideo, deleteVideo nếu cần
// ...

module.exports = router;
