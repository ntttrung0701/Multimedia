import React from 'react';
import { useLocation } from 'react-router-dom';
import MediaPlayer from '../../components/MediaPlayer'; // Import MediaPlayer
import './VideoPage.css';

const VideoPage = () => {
  const location = useLocation();
  const { video } = location.state || {}; // Nhận thông tin video từ location.state

  if (!video) {
    return <div>No video selected</div>;
  }

  return (
    <div className="video-page">
      <h1>{video.name}</h1>
      <div className="video-container">
        <MediaPlayer videoUrl={video.url} /> {/* Sử dụng MediaPlayer */}
      </div>
    </div>
  );
};

export default VideoPage;