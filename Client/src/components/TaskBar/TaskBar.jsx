import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TaskBar.css';

const TaskBar = () => {
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    // Reset lại trang chủ MainPage
    navigate('/');
    // Tải lại trang
    window.location.reload();
  };

  return (
    <div className="taskbar">
      <ul>
        <li><a href="/" onClick={handleHomeClick}>Home</a></li> {/* Sử dụng <a> thay vì <Link> để có thể ngăn chặn sự kiện mặc định */}
        <li><Link to="/image-editor">Image Editor</Link></li>
        <li><Link to="/video-editor">Video Editor</Link></li>
        <li><Link to="/video-page">Videos</Link></li>
        <li><Link to="/image-page">Images</Link></li>
        <li><Link to="/sound-page">Sounds</Link></li>
        <li><Link to="/live-stream">Live Stream</Link></li> {/* Đảm bảo đường dẫn đúng */}
      </ul>
    </div>
  );
};

export default TaskBar;