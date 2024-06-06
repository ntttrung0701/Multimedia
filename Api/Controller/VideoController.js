const Video = require('../Models/Video');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Tải lên video
exports.uploadVideo = [
  upload.single('video'),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'Please upload a video file' });
      }

      const newVideo = new Video({
        path: file.path,
        size: file.size,
        title: title,
        description: description,
        duration: 0,  // Bạn có thể sử dụng ffmpeg để tính toán thời lượng video nếu cần
        format: path.extname(file.originalname).slice(1)
      });

      await newVideo.save();
      res.status(201).json(newVideo);
    } catch (error) {
      res.status(500).json({ message: 'Error uploading video', error });
    }
  }
];
// Lấy tất cả video
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving videos', error });
  }
};

// Lấy từng video
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving video', error });
  }
};
// Phát video
exports.streamVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const videoPath = path.resolve(video.path);
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    const videoRange = req.headers.range;

    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
        return;
      }

      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error streaming video', error });
  }
};

// Cắt video thành video mới với độ dài tùy chọn
exports.cutVideo = async (req, res) => {
  const { id, startTime, duration } = req.body;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const inputPath = path.resolve(video.path);
    const outputPath = path.resolve(`uploads/videos/cut-${Date.now()}-${video.filename}`);

    ffmpeg(inputPath)
      .setStartTime(startTime)
      .setDuration(duration)
      .output(outputPath)
      .on('end', async () => {
        const newVideo = new Video({
          filename: `cut-${Date.now()}-${video.filename}`,
          path: outputPath,
          size: fs.statSync(outputPath).size,
          mimetype: video.mimetype,
          title: video.title,
          duration: duration,
          format: video.format,
        });

        await newVideo.save();
        res.status(201).json(newVideo);
      })
      .on('error', (err) => {
        res.status(500).json({ message: 'Error cutting video', error: err });
      })
      .run();
  } catch (error) {
    res.status(500).json({ message: 'Error cutting video', error });
  }
};

// Tải video về từ máy chủ về máy khách
exports.downloadVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const videoPath = path.resolve(video.path);
    res.download(videoPath, video.filename, (err) => {
      if (err) {
        res.status(500).json({ message: 'Error downloading video', error: err });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error downloading video', error });
  }
};