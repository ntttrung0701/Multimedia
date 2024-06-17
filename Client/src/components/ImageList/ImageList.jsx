// src/components/ImageList/ImageList.jsx
import React, { useEffect, useState } from 'react';
import { fetchImages, deleteImage } from '../../utils/api';
import './ImageList.css';
import ImageView from '../ImageView/ImageView';

const ImageList = ({ refresh, setRefresh }) => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchAllImages = async () => {
            try {
                const data = await fetchImages();
                setImages(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAllImages();
    }, [refresh]); // Thêm refresh vào dependency array để làm mới danh sách ảnh

    useEffect(() => {
        if (refresh) {
            setRefresh(false); // Reset lại state refresh sau khi làm mới danh sách ảnh
        }
    }, [refresh, setRefresh]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    const handleDelete = async (image) => {
        try {
            await deleteImage(image.id, image.name); // Xóa ảnh khỏi cơ sở dữ liệu và Firebase Storage
            setRefresh(true); // Làm mới danh sách ảnh sau khi xóa
        } catch (err) {
            console.error('Error deleting image:', err);
        }
    };

    return (
        <div>
            <div className="image-list">
                {images.map(image => (
                    <div key={image.id} className="image-item">
                        <img src={image.url} alt={image.name} onClick={() => handleImageClick(image)} />
                        <p>{image.name}</p>
                        <button onClick={() => handleDelete(image)}>Delete</button>
                    </div>
                ))}
            </div>
            {selectedImage && <ImageView image={selectedImage} onClose={handleClose} />}
        </div>
    );
};

export default ImageList;