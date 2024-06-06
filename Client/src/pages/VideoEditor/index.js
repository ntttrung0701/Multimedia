import React, { useState } from 'react';
import './VideoEditor.css';
import TaskBar from '../../components/TaskBar';
import MediaList from '../../components/MediaList';
import VideoCutter from '../../components/VideoCutter';
import VideoUploader from '../../components/VideoUploader';
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
      <TaskBar />
      <div className="content">
        <VideoUploader onUpload={handleUpload} />
        <MediaList onSelect={setSelectedVideo} />
        {selectedVideo && (
          <>
            <VideoCutter video={selectedVideo} />
            <button onClick={handleDownload}>Download Video</button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoEditorPage;
