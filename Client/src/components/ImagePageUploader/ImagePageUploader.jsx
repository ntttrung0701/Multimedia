// src/components/ImagePageUploader/ImagePageUploader.jsx
import React, { useState } from 'react';
import './ImagePageUploader.css';

const ImagePageUploader = ({ onUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUploadClick = () => {
        if (file) {
            onUpload(URL.createObjectURL(file), file.name);
        }
    };

    return (
        <div className="image-page-uploader">
            <input
                type="file"
                accept="image/*"
                id="image-page-upload"
                onChange={handleFileChange}
            />
            <label htmlFor="image-page-upload">Choose Image</label>
            {file && <div className="file-name">{file.name}</div>}
            <button onClick={handleUploadClick} disabled={!file}>Upload</button>
        </div>
    );
};

export default ImagePageUploader;