const Video = require('../models/Video');
const fs = require('fs');
const path = require('path');

const VideoController = {

  // Lấy tất cả video từ database
  getAllVideos: async (req, res) => {
    try {
      const videos = await Video.find({});
      res.json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  },

  // Lấy video theo ID
  getVideoById: async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(404).send('Video not found');
      }
      res.json(video);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  },

  // Tải video lên web và lưu vào database
  uploadVideo: async (req, res) => {
    try {
      // Đường dẫn của file video trong thư mục tạm sau khi được tải lên
      const videoPath = req.file.path; // Đường dẫn tới file video
      const videoSize = fs.statSync(videoPath).size; // Kích thước file
      
      // Tạo mới một video document với thông tin tương ứng
      const newVideo = new Video({
        title: req.body.title,
        duration: req.body.duration,
        format: path.extname(videoPath),
        path: videoPath,
        size: videoSize
      });

      // Lưu vào database
      const savedVideo = await newVideo.save();
      res.status(200).json(savedVideo);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  },

  // Cắt video theo yêu cầu
  cutVideo: async (req, res) => {
    try {
      // Khi nhận thông tin cắt từ request
      const { videoId, startTime, endTime } = req.body;
      const originalVideo = await Video.findById(videoId);
      if (!originalVideo) {
        return res.status(404).send('Original video not found');
      }

      // Tiến hành cắt video thông qua dịch vụ video
      const cutVideoPath = await videoService.cutVideo(originalVideo.path, startTime, endTime);

      // Response với đường dẫn của video đã cắt
      res.status(200).json({ path: cutVideoPath });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  },

  // Phát video trực tiếp từ server
  viewVideo: (req, res) => {
    const videoPath = path.join(__dirname, '..', 'uploads', req.params.filename);

    // Kiểm tra xem file có tồn tại không
    if (fs.existsSync(videoPath)) {
      res.sendFile(videoPath);
    } else {
      res.status(404).send('Video not found');
    }
  },

  // Chức năng truyền tải video từ server về máy khách
  downloadVideo: (req, res) => {
    const video = await.Video.findById(req.params.id);
    if (!video) {
      return res.status(404).send('Video not found');
    }

    res.download(video.path); // Trả về video với khả năng tải xuống
  },

  // Bạn có thể thêm các phương thức khác như deleteVideo, updateVideo nếu cần
};
module.exports = VideoController;