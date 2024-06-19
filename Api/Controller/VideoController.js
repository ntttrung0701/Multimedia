const { storage, db } = require('../Config/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { collection, addDoc, getDocs, doc, getDoc } = require('firebase/firestore');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// Hàm tải lên video
exports.uploadVideo = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.status(200).json({ message: 'Video uploaded successfully', fileName: file.filename });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Failed to upload video' });
  }
};

// Hàm cắt video
exports.cutVideo = async (req, res) => {
  const { videoFileName, startTime, endTime } = req.body;
  const inputPath = path.join(__dirname, '../uploads', videoFileName);
  const outputFileName = `cut_${Date.now()}_${videoFileName}`;
  const outputPath = path.join(__dirname, '../uploads', outputFileName);

  try {
    // Kiểm tra xem tệp đầu vào có tồn tại không
    if (!fs.existsSync(inputPath)) {
      throw new Error(`File not found: ${inputPath}`);
    }

    ffmpeg(inputPath)
      .setStartTime(startTime)
      .setDuration(endTime - startTime)
      .output(outputPath)
      .on('end', async () => {
        const outputFile = fs.readFileSync(outputPath);
        const storageRef = ref(storage, `videos/${outputFileName}`);
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
  } catch (error) {
    console.error('Error cutting video:', error);
    res.status(500).json({ error: 'Failed to cut video', details: error.message });
  }
};

// Hàm tải xuống video
exports.downloadVideo = async (req, res) => {
  const { videoPath } = req.params;
  try {
    const url = await downloadVideo(videoPath);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download video' });
  }
};

// Lấy tất cả video
exports.getAllVideos = async (req, res) => {
  const querySnapshot = await getDocs(collection(db, 'videos'));
  const videos = [];
  querySnapshot.forEach((doc) => {
    videos.push({ id: doc.id, ...doc.data() });
  });
  res.status(200).json(videos);
};

// Lấy video theo ID
exports.getVideoById = async (req, res) => {
  const docRef = doc(db, 'videos', req.params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    res.status(200).json(docSnap.data());
  } else {
    res.status(404).json({ message: 'Video not found' });
  }
};

// Xuất âm thanh từ video
exports.extractAudioFromVideo = async (req, res) => {
  const { videoUrl, videoName } = req.body;
  const tempDir = path.join(__dirname, '../temp');

  // Tạo thư mục tạm thời nếu chưa tồn tại
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const audioPath = path.join(tempDir, `${videoName}.mp3`);

  ffmpeg(videoUrl)
    .output(audioPath)
    .noVideo()
    .on('end', async () => {
      try {
        const audioFile = fs.readFileSync(audioPath);
        const storageRef = ref(storage, `sounds/${videoName}.mp3`);
        await uploadBytes(storageRef, audioFile);
        const audioUrl = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'sounds'), {
          name: `${videoName}.mp3`,
          url: audioUrl,
          createdAt: new Date(),
        });

        fs.unlinkSync(audioPath); // Xóa file tạm thời sau khi upload

        res.status(200).json({ message: 'Audio extracted and uploaded successfully', url: audioUrl });
      } catch (error) {
        console.error('Error uploading audio:', error);
        res.status(500).json({ error: 'Failed to upload audio' });
      }
    })
    .on('error', (err) => {
      console.error('Error extracting audio:', err);
      res.status(500).json({ error: 'Failed to extract audio' });
    })
    .run();
};