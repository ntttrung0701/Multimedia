// src/pages/LiveStreamPage/LiveStreamPage.jsx
import React from 'react';
import LiveStream from '../../components/LiveStream/LiveStream';
import './LiveStreamPage.css';

const LiveStreamPage = () => {
  return (
    <div className="live-stream-page">
      <h1>Live Stream</h1>
      <LiveStream />
    </div>
  );
};

export default LiveStreamPage;