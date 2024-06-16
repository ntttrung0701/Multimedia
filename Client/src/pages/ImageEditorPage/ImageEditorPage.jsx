// src/pages/ImageEditorPage/ImageEditorPage.jsx
import React, { useState } from 'react';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import ImageTool from '../../components/ImageTool/ImageTool';
import './ImageEditorPage.css';

const ImageEditorPage = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [flip, setFlip] = useState(false);
    const [filter, setFilter] = useState('');

    const handleUpload = (src) => {
        setImageSrc(src);
        setRotation(0);
        setFlip(false);
        setFilter('');
    };

    const handleRotateClockwise = () => {
        setRotation((prevRotation) => prevRotation + 90);
    };

    const handleRotateCounterClockwise = () => {
        setRotation((prevRotation) => prevRotation - 90);
    };

    const handleFlip = () => {
        setFlip((prevFlip) => !prevFlip);
    };

    const handleGrayscale = () => {
        setFilter((prevFilter) => (prevFilter === 'grayscale(100%)' ? '' : 'grayscale(100%)'));
    };

    const handleInvertColors = () => {
        setFilter((prevFilter) => (prevFilter === 'invert(100%)' ? '' : 'invert(100%)'));
    };

    return (
        <div className="image-editor-page">
            <ImageUploader onUpload={handleUpload} />
            <div className="editor-container">
                <ImageTool
                    onRotateClockwise={handleRotateClockwise}
                    onRotateCounterClockwise={handleRotateCounterClockwise}
                    onFlip={handleFlip}
                    onGrayscale={handleGrayscale}
                    onInvertColors={handleInvertColors}
                />
                {imageSrc && (
                    <div className="image-container">
                        <img
                            src={imageSrc}
                            alt="Edited"
                            style={{
                                transform: `rotate(${rotation}deg) scaleX(${flip ? -1 : 1})`,
                                filter: filter,
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageEditorPage;