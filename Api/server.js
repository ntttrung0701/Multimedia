require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Thêm dòng này
const connectDB = require('./Config/connect');
const imageRoutes = require('./Routes/ImageRoutes');
const videoRoutes = require('./Routes/VideoRoutes');

const app = express();

// Kết nối MongoDB
connectDB();
app.use(express.json());
app.use(cors()); // Thêm dòng này
app.use('/api', imageRoutes);
app.use('/api', videoRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});