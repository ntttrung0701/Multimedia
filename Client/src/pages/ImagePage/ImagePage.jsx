import React, { useEffect, useState } from 'react';
import { fetchImages } from '../../utils/api';
import './ImagePage.css';

const ImagePage = () => {
    const [images, setImages] = useState([]);

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
    }, []);

    return (
        <div className="image-page">
            <h1>All Images</h1>
            <div className="image-list">
                {images.map(image => (
                    <div key={image.name} className="image-item">
                        <img src={image.url} alt={image.name} />
                        <p>{image.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImagePage;