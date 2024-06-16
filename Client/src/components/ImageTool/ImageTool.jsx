// src/components/ImageTool/ImageTool.jsx
import React from 'react';
import './ImageTool.css';

const ImageTool = ({ onRotateClockwise, onRotateCounterClockwise, onFlip, onGrayscale, onInvertColors }) => {
    return (
        <div className="image-tool">
            <button onClick={onRotateClockwise}>Rotate Right</button>
            <button onClick={onRotateCounterClockwise}>Rotate Left</button>
            <button onClick={onFlip}>Flip</button>
            <button onClick={onGrayscale}>Grayscale</button>
            <button onClick={onInvertColors}>Invert Colors</button>
        </div>
    );
};

export default ImageTool;