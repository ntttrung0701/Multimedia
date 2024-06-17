// src/components/ImageTool/ImageTool.jsx
import React from 'react';
import './ImageTool.css';

const ImageTool = ({ onRotateClockwise, onRotateCounterClockwise, onFlip, onGrayscale, onInvertColors, onBlur, onPixelate }) => {
    return (
        <div className="image-tool">
            <button onClick={onRotateClockwise}>Rotate Right</button>
            <button onClick={onRotateCounterClockwise}>Rotate Left</button>
            <button onClick={onFlip}>Flip</button>
            <button onClick={onGrayscale}>Grayscale</button>
            <button onClick={onInvertColors}>Invert Colors</button>
            <button onClick={onBlur}>Blur</button>
            <button onClick={onPixelate}>Pixelate</button>
        </div>
    );
};

export default ImageTool;