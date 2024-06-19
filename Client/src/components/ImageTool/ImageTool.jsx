import React, { useState, useEffect } from 'react';
import './ImageTool.css';

const ImageTool = ({ onRotateClockwise, onRotateCounterClockwise, onFlip, onGrayscale, onInvertColors, onBlur, onPixelate, onCrop, onReset, onSave, imageSrc }) => {
    const [cropValues, setCropValues] = useState({ width: 100, height: 100 });

    useEffect(() => {
        if (imageSrc) {
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                setCropValues({ width: img.width, height: img.height });
            };
        }
    }, [imageSrc]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCropValues({ ...cropValues, [name]: value });
    };

    const handleCrop = () => {
        const { width, height } = cropValues;
        onCrop(0, 0, parseInt(width), parseInt(height));
    };

    return (
        <div className="image-tool">
            <div className="crop-inputs">
                <input type="number" name="width" value={cropValues.width} onChange={handleInputChange} placeholder="width" />
                <input type="number" name="height" value={cropValues.height} onChange={handleInputChange} placeholder="height" />
            </div>
            <button onClick={handleCrop}>Crop</button>
            <button onClick={onRotateClockwise}>Rotate Right</button>
            <button onClick={onRotateCounterClockwise}>Rotate Left</button>
            <button onClick={onFlip}>Flip</button>
            <button onClick={onGrayscale}>Grayscale</button>
            <button onClick={onInvertColors}>Invert Colors</button>
            <button onClick={onBlur}>Blur</button>
            <button onClick={onPixelate}>Pixelate</button>
            <button className="reset-button" onClick={onReset}>Reset</button>
            <button onClick={onSave}>Lưu Ảnh</button> {/* Nút Lưu Ảnh */}
        </div>
    );
};

export default ImageTool;