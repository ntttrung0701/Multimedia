const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../Controller/ImageController');
const authMiddleware = require('../middleware/authMiddleware');

// Các route bảo vệ
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'Đây là route được bảo vệ' });
});
// Cấu hình Multer
const upload = multer({ dest: 'uploads/' });
router.get('/images', imageController.getAllImages);
// Route lấy chi tiết một ảnh theo ID
router.get('/images/:id', imageController.getImageById);
// Route tải lên ảnh mới
// Sử dụng Multer middleware để xử lý file upload trong form-data
router.post('/images/upload', upload.single('file'), imageController.uploadImage);
// Route cập nhật thông tin ảnh
router.put('/images/:id', imageController.updateImage);
// Route xóa một ảnh khỏi database
router.delete('/images/:id', imageController.deleteImage);
// Route lưu ảnh sau khi được chỉnh sửa
// Đảm bảo name của input file trong form-upload là file
router.post('/images/edit', upload.single('file'), imageController.saveEditedImage);

module.exports = router;
