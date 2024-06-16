// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ImagePage from './pages/ImagePage/ImagePage';
import VideoPage from './pages/VideoPage/VideoPage';
import ImageEditorPage from './pages/ImageEditorPage/ImageEditorPage';
import VideoEditorPage from './pages/VideoEditorPage/VideoEditorPage';
import ImageView from './components/ImageView/ImageView';
import TaskBar from './components/TaskBar/TaskBar';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <TaskBar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/images" element={<ImagePage />} />
            <Route path="/images/:id" element={<ImageView />} />
            <Route path="/videos" element={<VideoPage />} />
            <Route path="/image-editor" element={<ImageEditorPage />} />
            <Route path="/video-editor" element={<VideoEditorPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;