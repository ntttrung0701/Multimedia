require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const imageRoutes = require('./Routes/ImageRoutes');
const videoRoutes = require('./Routes/VideoRoutes');
const soundRoutes = require('./Routes/SoundRoutes'); // Import SoundRoutes
const app = express();

// Middleware để xử lý JSON và URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware để cho phép CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(bodyParser.json());
app.use('/api/images', imageRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/sounds', soundRoutes); // Route cho sound

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});