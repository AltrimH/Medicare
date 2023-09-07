const path = require('path');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 6000;
const HOST = process.env.HOST || 'http://localhost:';

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Server is running on: ${HOST}${PORT}`);
})