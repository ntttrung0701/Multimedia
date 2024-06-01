const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    idImage: {
        type: Schema.Types.ObjectId, // Sửa ở đây
        ref: 'image', // Ghi chú: 'req' như trong mã ban đầu của bạn có vẻ như là một lỗi đánh máy, và tôi đã thay thế nó bằng 'ref', nếu nó có ý nghĩa trong logic của bạn.
        required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    format: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    size: {
      type: String, // Ghi chú: Nếu 'size' đề cập đến kích thước file, bạn có thể muốn sử dụng kiểu dữ liệu Number.
      required: true
    }
});

const Image = mongoose.model('image', ImageSchema);
module.exports = Image;
