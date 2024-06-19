import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './VideoCutter.css';

const VideoCutter = ({ videoUrl, onCut }) => {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [cutVideoUrl, setCutVideoUrl] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('loadedmetadata', () => {
                setEndTime(video.duration);
            });
        }
    }, [videoUrl]);

    const handleReset = () => {
        setStartTime(0);
        setEndTime(videoRef.current.duration);
    };

    const handlePreview = async () => {
        try {
            const response = await onCut(videoUrl, startTime, endTime);
            setCutVideoUrl(response.data.url);
        } catch (error) {
            console.error('Error cutting video:', error);
        }
    };

    const handleTimeUpdate = (e) => {
        const video = videoRef.current;
        if (video) {
            const currentTime = video.currentTime;
            if (currentTime < startTime) {
                video.currentTime = startTime;
            } else if (currentTime > endTime) {
                video.currentTime = startTime;
            }
        }
    };

    return (
        <div className="video-cutter">
            <video
                ref={videoRef}
                controls
                src={videoUrl}
                onTimeUpdate={handleTimeUpdate}
            ></video>
            <div className="controls">
                <label>
                    Start Time:
                    <input
                        type="range"
                        min="0"
                        max={videoRef.current ? videoRef.current.duration : 0}
                        value={startTime}
                        onChange={(e) => setStartTime(Number(e.target.value))}
                    />
                </label>
                <label>
                    End Time:
                    <input
                        type="range"
                        min="0"
                        max={videoRef.current ? videoRef.current.duration : 0}
                        value={endTime}
                        onChange={(e) => setEndTime(Number(e.target.value))}
                    />
                </label>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handlePreview}>Preview</button>
            </div>
            {cutVideoUrl && (
                <div className="cut-video-preview">
                    <h2>Cut Video Preview</h2>
                    <video controls src={cutVideoUrl}></video>
                </div>
            )}
        </div>
    );
};

export default VideoCutter;