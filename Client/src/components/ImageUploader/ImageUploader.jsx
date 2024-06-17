// src/components/ImageUploader/ImageUploader.jsx
import React, { useState } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ onUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        onUpload(URL.createObjectURL(selectedFile));
    };

    return (
        <div className="image-uploader">
            <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fa fa-cloud-upload"></i> Choose Image
            </label>
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
    );
};

export default ImageUploader;