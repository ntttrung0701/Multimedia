// src/components/ImageUploader/ImageUploader.jsx
import React, { useState } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ onUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        onUpload(URL.createObjectURL(selectedFile));
    };

    return (
        <div className="image-uploader">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {/* Loại bỏ phần hiển thị ảnh đã tải lên nếu không cần thiết */}
        </div>
    );
};

export default ImageUploader;