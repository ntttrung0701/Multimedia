import React, { useState } from 'react';
import './VideoCutter.css';
import { extractAudio } from '../../utils/api';

const VideoCutter = ({ video }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleExtractAudio = async () => {
    try {
      await extractAudio(video.filename);
      alert('Audio extracted successfully!');
    } catch (err) {
      console.error('Error extracting audio:', err);
      alert('Failed to extract audio.');
    }
  };

  const handleCutVideo = () => {
    // Logic cắt video
  };

  return (
    <div className="video-cutter">
      <h2>Video Cutter</h2>
      <div className="cutter-controls">
        <label>
          Start Time:
          <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </label>
        <label>
          End Time:
          <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </label>
        <button onClick={handleCutVideo}>Cut Video</button>
        <button onClick={handleExtractAudio}>Extract Audio</button>
      </div>
    </div>
  );
};

export default VideoCutter;