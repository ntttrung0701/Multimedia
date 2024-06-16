require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const imageRoutes = require('./Routes/ImageRoutes');
const videoRoutes = require('./Routes/VideoRoutes');
const app = express();

// Middleware để xử lý JSON và URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware để cho phép CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(bodyParser.json());
app.use('/api/images', imageRoutes);

// Route cho video
app.use('/api/videos', videoRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});