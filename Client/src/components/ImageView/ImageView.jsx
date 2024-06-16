// src/components/ImageView/ImageView.jsx
import React, { useState } from 'react';
import './ImageView.css';

const ImageView = ({ image, onClose }) => {
    const [scale, setScale] = useState(1);
    const defaultScale = 1;


    if (!image) return null;

    const handleWheel = (e) => {
        e.preventDefault(); // Ngăn sự kiện cuộn mặc định của trình duyệt
        if (e.deltaY < 0) {
            setScale(scale + 0.1);
        } else if (e.deltaY > 0 && scale > defaultScale) {
            setScale(scale - 0.1);
        }
    };

    const handleZoomIn = () => {
        setScale(scale + 0.1);
    };

    const handleZoomOut = () => {
        if (scale > defaultScale) {
            setScale(scale - 0.1);
        }
    };

    
    
    return (
        <div className="image-view-overlay" onClick={onClose}>
            <div className="image-view-content" onClick={(e) => e.stopPropagation()}>
                <div className="image-container">
                    <img
                        src={image.url}
                        alt={image.name}
                        style={{ transform: `scale(${scale})` }}
                        onWheel={handleWheel}
                    />
                </div>
                <div className="zoom-controls">
                    <button onClick={handleZoomIn}>+</button>
                    <button onClick={handleZoomOut}>-</button>
                </div>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ImageView;