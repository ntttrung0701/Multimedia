require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const imageRoutes = require('./Routes/ImageRoutes');
const videoRoutes = require('./Routes/VideoRoutes');
const soundRoutes = require('./Routes/SoundRoutes'); // Import SoundRoutes

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware để xử lý JSON và URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware để cho phép CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(bodyParser.json());
app.use('/api/images', imageRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/sounds', soundRoutes); // Route cho sound

let liveStream = null;

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('start-stream', (filePath) => {
    if (liveStream) {
      liveStream.kill();
    }

    liveStream = ffmpeg(filePath)
      .inputOptions('-re')
      .format('flv')
      .on('start', () => {
        console.log('Stream started');
      })
      .on('end', () => {
        console.log('Stream ended');
      })
      .on('error', (err) => {
        console.error('Stream error:', err);
      })
      .pipe(socket);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    if (liveStream) {
      liveStream.kill();
    }
  });
});

app.post('/upload', (req, res) => {
  const file = req.files.video;
  const uploadPath = path.join(__dirname, 'uploads', file.name);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ filePath: uploadPath });
  });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});