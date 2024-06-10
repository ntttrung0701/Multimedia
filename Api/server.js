require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Thêm dòng này
const connectDB = require('./Config/connect');
const imageRoutes = require('./Routes/ImageRoutes');
const videoRoutes = require('./Routes/VideoRoutes');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Định tuyến tĩnh cho thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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