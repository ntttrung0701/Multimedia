import React from 'react';
import { useLocation } from 'react-router-dom';
import MediaPlayer from '../../components/MediaPlayer/MediaPlayer';
import MediaList from '../../components/MediaList/MediaList';
import './VideoPage.css';

const VideoPage = () => {
  const location = useLocation();
  const { video } = location.state || {}; // Nhận thông tin video từ location.state

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
          <h1>Videos</h1>
          <MediaList />
        </>
      )}
    </div>
  );
};

export default VideoPage;