// src/pages/VideoEditor/VideoEditorPage.jsx
import React, { useState } from 'react';
import VideoUploader from '../../components/VideoUploader/VideoUploader';
import VideoCutter from '../../components/VideoCutter/VideoCutter';
import { cutVideo, uploadVideo } from '../../utils/api';
import './VideoEditorPage.css';

const VideoEditorPage = () => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoFileName, setVideoFileName] = useState(null);
    const [cutVideoUrl, setCutVideoUrl] = useState(null);

    const handleUpload = (url, fileName) => {
        setVideoUrl(url);
        setVideoFileName(fileName);
        setCutVideoUrl(null); // Reset cut video URL when a new video is uploaded
    };

    const handleCut = async (startTime, endTime) => {
        try {
            const cutUrl = await cutVideo(videoFileName, startTime, endTime);

            // Upload cut video to Firebase
            const response = await fetch(cutUrl);
            const blob = await response.blob();
            const formData = new FormData();
            formData.append('video', blob, `cut-${videoFileName}`);
            const uploadResponse = await uploadVideo(formData);

            setCutVideoUrl(uploadResponse.url); // Cập nhật URL của video đã cắt để hiển thị
            return uploadResponse.url;
        } catch (error) {
            console.error('Error cutting video:', error);
        }
    };

    return (
        <div className="video-editor-page">
            <h1>Trang chỉnh sửa video</h1>
            <h3>Chỉnh sửa video đăng tải lên</h3>
            <VideoUploader onUpload={handleUpload} />
            {videoUrl && (
                <div className="video-section">
                    <VideoCutter videoUrl={videoUrl} onCut={handleCut} />
                </div>
            )}
        </div>
    );
};

export default VideoEditorPage;