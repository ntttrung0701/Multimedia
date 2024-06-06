import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchVideos = async () => {
  const response = await fetch(`${API_URL}/videos`); // Sử dụng dấu backticks
  const data = await response.json();
  return data;
};

export const getAllVideos = async () => {
  const response = await axios.get(`${API_URL}/videos`); // Sử dụng dấu backticks
  return response.data;
};

export const getVideoById = async (id) => {
  const response = await axios.get(`${API_URL}/videos/${id}`); // Sử dụng dấu backticks
  return response.data;
};

export const streamVideo = async (id) => {
  const response = await axios.get(`${API_URL}/videos/stream/${id}`); // Sử dụng dấu backticks
  return response.data;
};

export const cutVideo = async (id, startTime, duration) => {
  const response = await axios.post(`${API_URL}/videos/cut`, { // Sử dụng dấu backticks
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
  const response = await axios.get(`${API_URL}/videos/download/${id}`, { // Sử dụng dấu backticks
    responseType: 'blob',
  });
  return response.data;
};