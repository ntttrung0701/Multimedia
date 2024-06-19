import React, { useState } from 'react';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import ImageTool from '../../components/ImageTool/ImageTool';
import { saveEditedImage } from '../../utils/api'; // Import hàm lưu ảnh
import './ImageEditorPage.css';

const ImageEditorPage = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [originalImageSrc, setOriginalImageSrc] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [flip, setFlip] = useState(false);
    const [filter, setFilter] = useState('');
    const [blur, setBlur] = useState(0);
    const [pixelate, setPixelate] = useState(1);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    const handleUpload = (src) => {
        setImageSrc(src);
        setOriginalImageSrc(src);
        setRotation(0);
        setFlip(false);
        setFilter('');
        setBlur(0);
        setPixelate(1);

        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImageDimensions({ width: img.width, height: img.height });
        };
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

    const handleBlur = () => {
        setBlur((prevBlur) => (prevBlur === 0 ? 5 : 0)); // Toggle blur
    };

    const handlePixelate = () => {
        setPixelate((prevPixelate) => (prevPixelate === 1 ? 20 : 1)); // Toggle pixelate
    };

    const handleCrop = (x, y, width, height) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
            setImageSrc(canvas.toDataURL());
        };
    };

    const handleReset = () => {
        setImageSrc(originalImageSrc);
        setRotation(0);
        setFlip(false);
        setFilter('');
        setBlur(0);
        setPixelate(1);
        const img = new Image();
        img.src = originalImageSrc;
        img.onload = () => {
            setImageDimensions({ width: img.width, height: img.height });
        };
    };

    const handleSave = async () => {
        if (imageSrc) {
            try {
                await saveEditedImage(imageSrc);
                alert('Ảnh đã được lưu thành công!');
            } catch (error) {
                console.error('Lỗi khi lưu ảnh:', error);
                alert('Lỗi khi lưu ảnh. Vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="image-editor-page">
            <h1>Chỉnh sửa ảnh đơn giản từ máy lên</h1>
            <ImageUploader onUpload={handleUpload} />
            <div className="editor-container">
                {imageSrc && (
                    <>
                        <ImageTool
                            onRotateClockwise={handleRotateClockwise}
                            onRotateCounterClockwise={handleRotateCounterClockwise}
                            onFlip={handleFlip}
                            onGrayscale={handleGrayscale}
                            onInvertColors={handleInvertColors}
                            onBlur={handleBlur}
                            onPixelate={handlePixelate}
                            onCrop={handleCrop}
                            onReset={handleReset}
                            onSave={handleSave} // Truyền hàm handleSave vào ImageTool
                            imageSrc={imageSrc}
                        />
                        <div className="image-container">
                            <div className="image-frame">
                                <img
                                    src={imageSrc}
                                    alt="Edited"
                                    style={{
                                        transform: `rotate(${rotation}deg) scaleX(${flip ? -1 : 1})`,
                                        filter: `${filter} blur(${blur}px)`,
                                        imageRendering: pixelate === 1 ? 'auto' : 'pixelated',
                                        width: pixelate === 1 ? 'auto' : `${pixelate * 100}%`,
                                        height: pixelate === 1 ? 'auto' : `${pixelate * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageEditorPage;