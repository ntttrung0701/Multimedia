const { google } = require('googleapis');
const drive = google.drive('v3');
const path = require('path');
const fs = require('fs');
const Images = require("../models/Images");
const { authenticate } = require("@google-cloud/local-auth");
const multer = require('multer');

// Lấy tất cả các ảnh từ database
exports.getAllImages = (req, res) => {
    const directoryPath = path.join(__dirname, '../uploads/image');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Unable to scan directory:', err); // Log lỗi
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        const images = files.map(file => ({
            name: file,
            url: `/uploads/image/${file}`
        }));
        res.send(images);
    });
};

async function createDriveClient() {
    const auth = await authenticate({
        keyfilePath: path.join(__dirname, 'path-to-your-google-credentials.json'),
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    google.options({ auth });
}
// Lấy chi tiết một ảnh theo ID
exports.getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).send("Image not found");
        }
        // Gửi chi tiết ảnh tới client
        res.json(image);
    } catch (error) {
        res.status(500).send("Error retrieving the image details");
    }
};

// Tải lên ảnh mới
const upload = multer({ dest: 'uploads/' });

// Hàm xác thực và tạo API client cho Google Drive
async function createDriveClient() {
    const auth = await authenticate({
        keyfilePath: path.join(__dirname, 'path-to-your-google-credentials.json'),
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    google.options({ auth });
}

// Hàm tải ảnh lên Google Drive và lưu thông tin vào database
exports.uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    
    // Gọi hàm xác thực và tạo API client
    await createDriveClient();

    // Đọc file từ request
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const fileMetadata = {
        name: req.file.filename,
        parents: ['ID thư mục Google Drive nếu bạn muốn tải lên một thư mục cụ thể'],
    };
    const media = {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(filePath),
    };
    // Trong hàm uploadImage, sửa đoạn tạo file trên Google Drive
const file = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id, webContentLink'
});
    try {
        // Tải ảnh lên Google Drive

        // Lưu thông tin ảnh vào database
        const newImage = new Image({
            title: req.body.title,
            description: req.body.description,
            format: req.file.mimetype,
            path: file.data.webContentLink,
            size: req.file.size,
            driveId: file.data.id // ID của file trên Google Drive
        });
        await newImage.save();

        res.status(201).send('Image uploaded to Drive and information saved in DB');
    } catch (error) {
        res.status(500).send('Failed to upload image to Drive');
    } finally {
        // Xóa file tạm thời sau khi đã tải lên Drive
        fs.unlinkSync(filePath);
    }
};
// Cập nhật thông tin ảnh
exports.updateImage = async (req, res) => {
    try {
        const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Trả về ảnh đã được cập nhật
        res.json(updatedImage);
    } catch (error) {
        res.status(500).send("Error updating the image");
    }
};

// Xóa một ảnh khỏi database
exports.deleteImage = async (req, res) => {
    try {
        await Image.findByIdAndDelete(req.params.id);
        res.status(200).send("Image deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting the image");
    }
};

//lưu ảnh sau khi edit
exports.saveEditedImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    // Vì hàm tạo Drive client và tải lên Google Drive đã được định nghĩa,
    // sử dụng lại logic đó để tải ảnh mới lên
    await createDriveClient();

    // Đọc file từ request
    const editedFilePath = path.join(__dirname, 'uploads', req.file.filename);
    const fileMetadata = {
        name: req.file.filename,
        parents: ['ID thư mục Google Drive nếu bạn muốn'], // Optional
    };
    const media = {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(editedFilePath),
    };

    try {
        // Tải ảnh đã chỉnh sửa lên Google Drive
        const file = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webContentLink'
        });

        // Lưu thông tin ảnh vào database
        const editedImage = new Image({
            title: 'Edited ' + req.body.title, // Có thể sửa đổi tiêu đề để phân biệt
            description: req.body.description,
            format: req.file.mimetype,
            path: file.data.webContentLink, // Link xem trực tiếp ảnh
            size: req.file.size,
            driveId: file.data.id // ID của file trên Google Drive
        });

        await editedImage.save();

        res.status(201).send('Edited image saved to Drive and DB');
    } catch (error) {
        res.status(500).send('Failed to upload edited image to Drive');
    } finally {
        // Xóa file tạm thời
        fs.unlinkSync(editedFilePath);
    }
};
