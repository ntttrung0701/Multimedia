import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ImageEditor from './pages/ImageEditor';
import VideoEditor from './pages/VideoEditor';
import VideoPage from './pages/VideoPage';
import ImagePage from './pages/ImagePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/image-editor" element={<ImageEditor />} />
        <Route path="/video-editor" element={<VideoEditor />} />
        <Route path="/video-page" element={<VideoPage />} />
        <Route path="/image-page" element={<ImagePage />} />
      </Routes>
    </Router>
  );
};

export default App;