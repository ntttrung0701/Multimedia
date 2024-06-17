import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const downloadVideo = async (videoPath) => {
  try {
    const response = await axios.get(`${API_URL}/videos/download/${videoPath}`);
    return response.data.url;
  } catch (error) {
    console.error('Error downloading video:', error);
    throw error;
  }
};

export const uploadImage = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/images/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const fetchImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/images`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const getImageById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/images/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image by ID:', error);
    throw error;
  }
};

// Video API

export const uploadVideo = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/videos/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

export const fetchVideos = async () => {
  try {
    const response = await axios.get(`${API_URL}/videos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

export const getVideoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/videos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    throw error;
  }
};

export const cutVideo = async (videoFileName, startTime, endTime) => {
  try {
    const response = await axios.post(`${API_URL}/videos/cut`, { videoFileName, startTime, endTime });
    return response.data.url;
  } catch (error) {
    console.error('Error cutting video:', error);
    throw error;
  }
};

export const deleteImage = async (id, imageName) => {
  try {
    const response = await axios.delete(`${API_URL}/images/${id}`, {
      data: { imageName }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

// Sound API

export const fetchSounds = async () => {
  try {
    const response = await axios.get(`${API_URL}/sounds`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sounds:', error);
    throw error;
  }
};

export const extractAudioFromVideo = async (video) => {
  try {
    const response = await axios.post(`${API_URL}/videos/extract-audio`, {
      videoUrl: video.url,
      videoName: video.name,
    });
    return response.data;
  } catch (error) {
    console.error('Error extracting audio from video:', error);
    throw error;
  }
};