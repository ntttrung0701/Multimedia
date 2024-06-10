import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import VideoEditor from './pages/VideoEditor/VideoEditor'; // Đảm bảo đường dẫn đúng
import VideoPage from './pages/VideoPage/VideoPage'; // Đảm bảo đường dẫn đúng
import ImagePage from './pages/ImagePage/ImagePage';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/video-editor" element={<VideoEditor />} />
        <Route path="/video-page" element={<VideoPage />} />
        <Route path="/image-page" element={<ImagePage />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));