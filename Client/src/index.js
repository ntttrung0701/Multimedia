import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import VideoEditor from './pages/VideoEditor';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/video-editor" element={<VideoEditor />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));