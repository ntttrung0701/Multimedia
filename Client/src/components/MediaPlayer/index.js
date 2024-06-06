import React from 'react';
import './MediaPlayer.css';

const MediaPlayer = ({ video }) => {
  if (!video) return <div className="media-player">Select a video to play</div>;

  return (
    <div className="media-player">
      <video controls>
        <source src={`/api/videos/stream/${video._id}`} type="video/mp4" />
      </video>
    </div>
  );
};

export default MediaPlayer;