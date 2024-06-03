const express = require('express');
const multer = require('multer'); // Giả sử bạn sử dụng multer để xử lý file upload
const VideoController = require('../Controller/VideoController');

// Khởi tạo router
const router = express.Router();

// Cấu hình multer (thêm cấu hình cụ thể tùy theo yêu cầu của bạn)
const upload = multer({
  dest: 'path/to/temporary/folder/',
  // các cài đặt khác để xử lý file uploads
});

// Route lấy tất cả video
router.get('/videos', VideoController.getAllVideos);

// Route lấy video theo id
router.get('/videos/:id', VideoController.getVideoById);

// Route upload video
// Đảm bảo rằng 'video' phù hợp với tên trường trong form-data bạn gửi từ client
router.post('/videos/upload', upload.single('video'), VideoController.uploadVideo);

// Route xem video - bạn cần hoàn thiện phần logic
router.get('/videos/view/:id', VideoController.viewVideo);

// Route cắt video
router.post('/videos/cut', VideoController.cutVideo);

// Thêm các route khác mà bạn cần

module.exports = router;
