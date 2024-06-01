const express = require('express');
const app = express();
const imageRoutes = require('./Routes/ImageRoutes');

app.use(express.json());
app.use('/Api', imageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port ${port}');
});
