const { storage, db } = require('../Config/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { collection, addDoc, getDocs, doc, getDoc } = require('firebase/firestore');
// Api/Controller/VideoController.js
// Api/Controller/VideoController.js
const { downloadVideo } = require('../utils/api');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// Cut Video
exports.cutVideo = async (req, res) => {
  const { videoFileName, startTime, endTime } = req.body;
  if (!videoFileName) {
      return res.status(400).json({ error: 'videoFileName is required' });
  }

  const inputPath = path.join(__dirname, '..', 'uploads', videoFileName);
  const outputPath = path.join(__dirname, '..', 'uploads', `cut-${Date.now()}.mp4`);

  ffmpeg(inputPath)
      .setStartTime(startTime)
      .setDuration(endTime - startTime)
      .output(outputPath)
      .on('end', async () => {
          const outputFile = fs.readFileSync(outputPath);
          const storageRef = ref(storage, `videos/cut-${Date.now()}.mp4`);
          await uploadBytes(storageRef, outputFile);
          const url = await getDownloadURL(storageRef);

          fs.unlinkSync(outputPath); // Xóa file tạm thời sau khi upload

          res.status(200).json({ url });
      })
      .on('error', (err) => {
          console.error('Error cutting video:', err);
          res.status(500).json({ error: 'Failed to cut video' });
      })
      .run();
};

exports.downloadVideo = async (req, res) => {
  const { videoPath } = req.params;
  try {
    const url = await downloadVideo(videoPath);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download video' });
  }
};
// Upload Video
exports.uploadVideo = async (req, res) => {
  try {
      const file = req.file;
      const storageRef = ref(storage, `videos/${Date.now()}-${file.originalname}`);
      await uploadBytes(storageRef, file.buffer);
      const url = await getDownloadURL(storageRef);

      const docRef = await addDoc(collection(db, 'videos'), {
          name: file.originalname,
          url: url,
          createdAt: new Date(),
      });

      res.status(200).json({ id: docRef.id, url: url });
  } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ error: 'Failed to upload video' });
  }
};
// Fetch Videos
exports.getAllVideos = async (req, res) => {
  const querySnapshot = await getDocs(collection(db, 'videos'));
  const videos = [];
  querySnapshot.forEach((doc) => {
    videos.push({ id: doc.id, ...doc.data() });
  });
  res.status(200).json(videos);
};

// Get Video by ID
exports.getVideoById = async (req, res) => {
  const docRef = doc(db, 'videos', req.params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    res.status(200).json(docSnap.data());
  } else {
    res.status(404).json({ message: 'Video not found' });
  }
};