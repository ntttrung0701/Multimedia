const express = require('express');
const app = express();
const imageRoutes = require('./Routes/ImageRoutes');
const videoRoutes = require('./Routes/VideoRoutes');

app.use(express.json());
app.use('/api', imageRoutes);
app.use('/api', videoRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port ${port}'); // Chú ý sử dụng backticks ở đây
});
