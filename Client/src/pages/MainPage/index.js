import React from 'react';
import TaskBar from '../../components/TaskBar';
import MediaList from '../../components/MediaList';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page">
      <TaskBar />
      <div className="content">
        <MediaList />
      </div>
    </div>
  );
};

export default MainPage;