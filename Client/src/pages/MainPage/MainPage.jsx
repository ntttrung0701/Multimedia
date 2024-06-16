// src/pages/MainPage/MainPage.jsx
import React from 'react';
import TaskBar from '../../components/TaskBar/TaskBar';
import MediaList from '../../components/MediaList/MediaList';
import './MainPage.css';
import mainpageThumbnail from '../../assets/Images/mainpage.png'; // Import ảnh thumbnail

const MainPage = () => {
  return (
    <div className="main-page">
      <TaskBar />
      <div className="content">
        <div className="thumbnail-container">
          <img src={mainpageThumbnail} alt="MainPage Thumbnail" className="thumbnail" />
          <div className="header">
            <h1>Trang blog về video và ảnh động vật</h1>
            <p>Có thể đăng tải, xem và chỉnh sửa.</p>
          </div>
        </div>
        <MediaList />
      </div>
    </div>
  );
};

export default MainPage;