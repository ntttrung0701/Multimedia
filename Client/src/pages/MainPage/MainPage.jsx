import React from 'react';
import TaskBar from '../../components/TaskBar/TaskBar';
import MediaList from '../../components/MediaList';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page">
      <TaskBar />
      <div className="content">
        <div className="header">
          <h1>Web súc vật</h1>
          <p>Explore and enjoy a wide variety of videos and images.</p>
        </div>
        <MediaList />
      </div>
    </div>
  );
};

export default MainPage;