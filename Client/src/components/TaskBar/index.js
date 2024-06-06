import React from 'react';
import { Link } from 'react-router-dom';
import './TaskBar.css';

const TaskBar = () => {
  return (
    <div className="taskbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/image-editor">Image Editor</Link></li>
        <li><Link to="/video-editor">Video Editor</Link></li>
        <li><Link to="/video-page">Videos</Link></li>
        <li><Link to="/image-page">Images</Link></li>
      </ul>
    </div>
  );
};

export default TaskBar;