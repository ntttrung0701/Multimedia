import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchVideos } from '../../utils/api';
import './MediaList.css';

const MediaList = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    const getVideos = async () => {
      const data = await fetchVideos();
      setVideos(data);
    };

    getVideos();
  }, []);

  const handleVideoClick = (video) => {
    navigate(`/video-page`, { state: { video } }); // Điều hướng đến VideoPage với thông tin video
  };

  return (
    <div className="media-list">
      {videos.map(video => (
        <div key={video.name} className="media-item" onClick={() => handleVideoClick(video)}>
          <video width="320" height="240" controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h3>{video.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MediaList;