import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Video API
export const fetchVideos = async () => {
  const response = await axios.get(`${API_URL}/videos`);
  return response.data;
};

export const getAllVideos = async () => {
  const response = await axios.get(`${API_URL}/videos`);
  return response.data;
};

export const getVideoById = async (id) => {
  const response = await axios.get(`${API_URL}/videos/${id}`);
  return response.data;
};

export const streamVideo = async (id) => {
  const response = await axios.get(`${API_URL}/videos/stream/${id}`);
  return response.data;
};

export const cutVideo = async (id, startTime, duration) => {
  const response = await axios.post(`${API_URL}/videos/cut`, {
    id,
    startTime,
    duration,
  });
  return response.data;
};

export const uploadVideo = async (formData) => {
  const response = await axios.post(`${API_URL}/videos/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const downloadVideo = async (id) => {
  const response = await axios.get(`${API_URL}/videos/download/${id}`, {
    responseType: 'blob',
  });
  return response.data;
};
export const extractAudio = async (filename) => {
  const response = await axios.post(`${API_URL}/videos/extract-audio`, { filename });
  return response.data;
};
// Image API
export const fetchImages = async () => {
  const response = await axios.get(`${API_URL}/images`);
  return response.data;
};

export const getAllImages = async () => {
  const response = await axios.get(`${API_URL}/images`);
  return response.data;
};

export const getImageById = async (id) => {
  const response = await axios.get(`${API_URL}/images/${id}`);
  return response.data;
};

export const uploadImage = async (formData) => {
  const response = await axios.post(`${API_URL}/images/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteImage = async (id) => {
  const response = await axios.delete(`${API_URL}/images/${id}`);
  return response.data;
};

export const updateImage = async (id, formData) => {
  const response = await axios.put(`${API_URL}/images/${id}`, formData);
  return response.data;
};

export const saveEditedImage = async (formData) => {
  const response = await axios.post(`${API_URL}/images/save-edited`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};