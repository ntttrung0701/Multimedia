import React, { useState } from 'react';
import './VideoUploader.css';
import { uploadVideo } from '../../utils/api';

const VideoUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    const data = await uploadVideo(formData);
    onUpload(data);
  };

  return (
    <div className="video-uploader">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
};

export default VideoUploader;