// src/components/VideoUploader/VideoUploader.jsx
import React, { useState } from 'react';
import './VideoUploader.css';

const VideoUploader = ({ onUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        onUpload(URL.createObjectURL(selectedFile), selectedFile.name);
    };

    return (
        <div className="video-uploader">
            <input
                type="file"
                accept="video/*"
                id="video-upload"
                onChange={handleFileChange}
            />
            <label htmlFor="video-upload">Choose Video</label>
            {file && <div className="file-name">{file.name}</div>}
        </div>
    );
};

export default VideoUploader;