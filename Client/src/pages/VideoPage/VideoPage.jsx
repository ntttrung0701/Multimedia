// src/pages/VideoPage/VideoPage.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MediaPlayer from '../../components/MediaPlayer/MediaPlayer';
import MediaList from '../../components/MediaList/MediaList';
import { uploadVideo } from '../../utils/api';
import './VideoPage.css';

const VideoPage = () => {
  const location = useLocation();
  const { video } = location.state || {}; // Nhận thông tin video từ location.state
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('video', file);
      try {
        setUploadStatus('Uploading...');
        await uploadVideo(formData); // Loại bỏ biến response không sử dụng
        setUploadStatus('Upload successful!');
        setFile(null);
        // Optionally, you can refresh the video list or redirect to the video page
      } catch (error) {
        console.error('Error uploading video:', error);
        setUploadStatus('Upload failed. Please try again.');
      }
    }
  };

  return (
    <div className="video-page">
      {video ? (
        <>
          <h1>{video.name}</h1>
          <div className="video-container">
            <MediaPlayer videoUrl={video.url} />
          </div>
        </>
      ) : (
        <>
          <h1>Kho video về động vật</h1>
          <div className="upload-section">
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Video</button>
            {uploadStatus && <p>{uploadStatus}</p>}
          </div>
          <MediaList />
        </>
      )}
    </div>
  );
};

export default VideoPage;