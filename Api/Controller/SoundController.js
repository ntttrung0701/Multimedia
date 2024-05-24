const db = require('../Models/Sound'); // Thay đổi đường dẫn phù hợp với cấu trúc của bạn
const {google} = require('googleapis');
const { model } = require('mongoose');
const drive = google.drive('v3');
const stream = require('stream');
const player = require('play-sound')(opts = {});

// Giả định rằng bạn đã cấu hình xác thực cho Google API
const oauth2Client = new google.auth.OAuth2(
  /* Your Credentials */
);

const soundController = {
  // Lấy tất cả các bài hát từ cơ sở dữ liệu
  getAllSongsFromDB: async (req, res) => {
    try {
      const songs = await db.Song.findAll();
      res.json(songs);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Lấy tất cả các bài hát từ Google Drive
  getAllSongsFromDrive: async (req, res) => {
    try {
      const response = await drive.files.list({
        auth: oauth2Client,
        q: "mimeType='audio/mp3'"
      });
      res.json(response.data.files);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Phát bài hát
  playSong: (req, res) => {
    //const songPath = /* Đường dẫn đến file nhạc */
    const audio = player.play(songPath, (err) => {
      if (err) res.status(500).send(err);
    });

    res.send('Now playing...');
  },

  // Dừng nhạc
  stopSong: (req, res) => {
    // Logic dừng nhạc phụ thuộc vào thư viện bạn chọn sử dụng.
  },

  // Tiếp tục phát nhạc
  resumeSong: (req, res) => {
    // Logic tiếp tục phát nhạc phụ thuộc vào thư viện bạn chọn sử dụng.
  },
  
  // Chuyển bài khác
  nextSong: (req, res) => {
    // Logic chuyển bài phụ thuộc vào thư viện bạn chọn sử dụng và danh sách chơi nhạc của bạn.
  },
  
  // Tăng giảm âm lượng
  adjustVolume: (req, res) => {
    const volumeLevel = req.body.volume; // Điều chỉnh theo request
    // Logic tăng giảm âm lượng phụ thuộc vào thư viện bạn chọn sử dụng.
  }
};

module.exports = soundController;
