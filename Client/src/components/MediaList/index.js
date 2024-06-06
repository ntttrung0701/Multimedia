import React, { useEffect, useState } from 'react';
import { fetchVideos } from '../../utils/api';
import './MediaList.css';

const MediaList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const data = await fetchVideos();
      setVideos(data);
    };

    getVideos();
  }, []);

  return (
    <div className="media-list">
      {videos.map(video => (
        <div key={video.id} className="media-item">
          <img src={video.thumbnail} alt={video.title} />
          <h3>{video.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MediaList;