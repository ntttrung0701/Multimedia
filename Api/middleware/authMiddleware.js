const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Lấy token từ header, có thể sửa 'x-auth-token' tùy theo tên bạn đã đặt trên client
  const token = req.header('x-auth-token');

  // Kiểm tra xem token có tồn tại không
  if (!token) {
    return res.status(401).json({ msg: 'Không tìm thấy token, truy cập bị từ chối' });
  }

  // Nếu tồn tại token, xác thực token
  try {
    // Sử dụng jwt.verify để kiểm tra token, sử dụng "secret" mà bạn đã dùng khi tạo token
    const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
    
    // Lưu thông tin user vào req.user để middleware tiếp theo có thể sử dụng
    req.user = decoded.user;
    
    // Gọi next() để chuyển sang middleware hoặc route handler tiếp theo
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token không hợp lệ' });
  }
};

module.exports = authMiddleware;
