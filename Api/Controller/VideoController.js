const Video = require('../models/Video');

const VideoController = {

  getAllVideos: async (req, res) => {
    try {
      const videos = await Video.find({});
      res.json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  },

  getVideoById: async (req, res) => {
    try {
      const video = await Video.findById(req.params.id); // sử dụng req.params.id để lấy id từ URL
      if (!video) {
        return res.status(404).send('Video not found');
      }
      res.json(video);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  },

  uploadVideo: async (req, res) => {
    try {
      const { file } = req; // Giả định rằng file đã được đính kèm thông qua multer
      const videoMetadata = await videoService.uploadVideoToDrive(file); // uploadVideoToDrive phải trả về metadata cần thiết để lưu trên db
      
      const newVideo = new Video({
        ...videoMetadata,
      });
      
      const savedVideo = await newVideo.save();
      res.json(savedVideo);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  },

  viewVideo: (req, res) => {
    // Phương pháp này phụ thuộc vào cách bạn phục vụ video,
    // với Google Drive, bạn có thể phục vụ một liên kết trực tiếp đến file hoặc sử dụng API để phát stream video
  },

  cutVideo: async (req, res) => {
    try {
      const { videoId, startTime, endTime } = req.body;

      const video = await Video.findById(videoId);
      if (!video) {
        return res.status(404).send('Original video not found');
      }

      // Cắt video bằng cách sử dụng googleDriveUtils hoặc một service riêng
      const cutVideoMetadata = await videoService.cutVideo(video.path, startTime, endTime);

      // Tải video đã cắt lên Google Drive
      const cutVideoFile = cutVideoMetadata.file;
      const uploadedCutVideoMetadata = await googleDriveUtils.uploadFile(cutVideoFile);

      const newVideo = new Video({
        ...uploadedCutVideoMetadata,
      });

      const savedCutVideo = await newVideo.save();
      // saveCutVideo.data.id
      // api/video/create => id

      res.json(savedCutVideo);

    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  },

  // Thêm các phương pháp other methods here, như deleteVideo, updateVideo, etc...

};

module.exports = VideoController;
