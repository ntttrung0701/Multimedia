// src/components/LiveStream/LiveStream.jsx
import React, { useState } from 'react';
import io from 'socket.io-client';
import './LiveStream.css';

const socket = io('http://localhost:5000'); // Đảm bảo địa chỉ IP đúng

const LiveStream = () => {
  const [file, setFile] = useState(null);
  const [streaming, setStreaming] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', file);

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    socket.emit('start-stream', data.filePath);
    setStreaming(true);
  };

  return (
    <div className="live-stream">
      <h1>Live Stream</h1>
      {!streaming ? (
        <>
          <input type="file" accept="video/*" onChange={handleFileChange} />
          <button onClick={handleUpload}>Start Streaming</button>
        </>
      ) : (
        <video id="live-video" controls autoPlay>
          <source src="http://localhost:5000/live" type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default LiveStream;