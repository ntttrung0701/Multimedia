// Api/utils/api.js
const { getStorage, ref, getDownloadURL } = require('firebase/storage');
const { storage } = require('../Config/firebase');

const downloadVideo = async (videoPath) => {
  try {
    const videoRef = ref(storage, videoPath);
    const url = await getDownloadURL(videoRef);
    return url;
  } catch (error) {
    console.error('Error downloading video:', error);
    throw error;
  }
};

module.exports = { downloadVideo };