import React from 'react';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import './ImageEditorPage.css';

const ImageEditor = () => {
  return (
    <div className="image-editor-page">
      <ImageUploader />
    </div>
  );
};

export default ImageEditor;