// src/components/ImageList/ImageList.jsx
import React, { useEffect, useState } from 'react';
import { fetchImages } from '../../utils/api';
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

    return (
        <div>
            <div className="image-list">
                {images.map(image => (
                    <div key={image.name} className="image-item" onClick={() => handleImageClick(image)}>
                        <img src={image.url} alt={image.name} />
                        <p>{image.name}</p>
                    </div>
                ))}
            </div>
            {selectedImage && <ImageView image={selectedImage} onClose={handleClose} />}
        </div>
    );
};

export default ImageList;