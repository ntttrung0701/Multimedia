require('dotenv').config(); // Nếu bạn sử dụng dotenv
const express = require('express');
const connectDB = require('./Config/connect');
const imageRoutes = require('./Routes/ImageRoutes');
const videoRoutes = require('./Routes/VideoRoutes')

const app = express();

// Kết nối MongoDB
connectDB();
app.use(express.json());
app.use('/api', imageRoutes);
app.use('/api', videoRoutes);
// Các cài đặt khác như middleware, routes, ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server đang chạy trên port ${PORT}'));
