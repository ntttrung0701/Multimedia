import React, { useState } from 'react';
import './VideoEditor.css';
import VideoCutter from '../../components/VideoCutter/VideoCutter';
import VideoUploader from '../../components/VideoUploader/VideoUploader';
import { downloadVideo } from '../../utils/api';

const VideoEditorPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleUpload = (newVideo) => {
    setSelectedVideo(newVideo);
  };

  const handleDownload = async () => {
    if (selectedVideo) {
      const blob = await downloadVideo(selectedVideo._id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', selectedVideo.filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  return (
    <div className="video-editor-page">
      <h1>Video Editor</h1>
      <div className="content">
        <VideoUploader onUpload={handleUpload} />
        {selectedVideo && (
          <>
            <VideoCutter video={selectedVideo} />
            <button className="download-button" onClick={handleDownload}>Download Video</button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoEditorPage;