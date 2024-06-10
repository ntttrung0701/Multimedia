import React from 'react';
import './MediaPlayer.css'; // Import CSS cho MediaPlayer

const MediaPlayer = ({ videoUrl }) => {
    return (
        <div className="media-player">
            <video controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default MediaPlayer;