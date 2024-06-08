import React, { useState } from 'react';
import './VideoUploader.css';
import { uploadVideo } from '../../utils/api';

const VideoUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const data = await uploadVideo(formData);
      onUpload(data);
      setMessage('Upload successful!');
    } catch (error) {
      setMessage('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="video-uploader">
      <h2>Upload Your Video</h2>
      <input type="file" onChange={handleFileChange} />
      {file && <p>Selected file: {file.name}</p>}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default VideoUploader;