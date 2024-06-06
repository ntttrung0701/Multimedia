import React, { useState } from 'react';
import './VideoCutter.css';
import { cutVideo } from '../../utils/api';

const VideoCutter = ({ video }) => {
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');

  const handleCut = async () => {
    const data = await cutVideo(video._id, startTime, duration);
    console.log(data);
  };

  return (
    <div className="video-cutter">
      <input
        type="text"
        placeholder="Start Time (seconds)"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Duration (seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button onClick={handleCut}>Cut Video</button>
    </div>
  );
};

export default VideoCutter;