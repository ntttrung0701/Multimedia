import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVideos, extractAudioFromVideo } from '../../utils/api'; // Import hàm extractAudioFromVideo
import './MediaList.css';

const MediaList = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getVideos = async () => {
      const data = await fetchVideos();
      setVideos(data);
    };

    getVideos();
  }, []);

  const handleVideoClick = (video) => {
    navigate(`/video-page`, { state: { video } });
  };

  const handleExtractAudio = async (video) => {
    try {
      await extractAudioFromVideo(video);
      alert('Audio extracted and uploaded successfully');
    } catch (error) {
      console.error('Error extracting audio:', error);
      alert('Failed to extract audio');
    }
  };

  return (
    <div className="media-list">
      {videos.map(video => (
        <div key={video.name} className="media-item">
          <video width="320" height="240" controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h3>{video.name}</h3>
          <div className="button-container">
            <button className="btn play-btn" onClick={() => handleVideoClick(video)}>Play Video</button>
            <button className="btn extract-btn" onClick={() => handleExtractAudio(video)}>Extract Audio</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaList;