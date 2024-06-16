// src/pages/ImagePage/ImagePage.jsx
import React, { useState } from 'react';
import ImageList from '../../components/ImageList/ImageList';
import ImagePageUploader from '../../components/ImagePageUploader/ImagePageUploader'; // Import ImagePageUploader
import './ImagePage.css';
import thumbnail from '../../assets/Images/imagethumbnail.png'; // Import ảnh thumbnail
import { uploadImage } from '../../utils/api'; // Import hàm uploadImage

const ImagePage = () => {
  const [refreshImages, setRefreshImages] = useState(false); // State để làm mới danh sách ảnh
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);

  const handleUpload = async (url, fileName) => {
    setImageUrl(url);
    setImageFileName(fileName);

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('image', blob, fileName);
      const uploadResponse = await uploadImage(formData);

      setImageUrl(uploadResponse.url); // Cập nhật URL của ảnh đã tải lên để hiển thị
      setRefreshImages(!refreshImages); // Làm mới danh sách ảnh sau khi tải lên
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="image-page">
      <div className="thumbnail-container">
        <img src={thumbnail} alt="Thumbnail" className="thumbnail" />
        <div className="header">
          <h1>KHO ẢNH ĐỘNG VẬT</h1>
        </div>
      </div>
      <div className="upload-section">
        <ImagePageUploader onUpload={handleUpload} />
      </div>
      <ImageList refresh={refreshImages} setRefresh={setRefreshImages} /> {/* Truyền props để làm mới danh sách ảnh */}
    </div>
  );
};

export default ImagePage;