import React from 'react';
import ImageList from '../../components/ImageList/ImageList';
import './ImagePage.css';

const ImagePage = () => {
    return (
        <div className="image-page">
            <h1>All Images</h1>
            <ImageList />
        </div>
    );
};

export default ImagePage;