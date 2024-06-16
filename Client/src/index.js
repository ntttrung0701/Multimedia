import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import VideoEditorPage from './pages/VideoEditorPage/VideoEditorPage'; // Đảm bảo đường dẫn đúng
import VideoPage from './pages/VideoPage/VideoPage'; // Đảm bảo đường dẫn đúng
import ImageEditorPage from './pages/ImageEditorPage/ImageEditorPage';
import ImagePage from './pages/ImagePage/ImagePage';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/video-editor" element={<VideoEditorPage />} />
        <Route path="/video-page" element={<VideoPage />} />
        <Route path="/image-page" element={<ImagePage />} />
        <Route path="/image-editor" element={<ImageEditorPage />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));