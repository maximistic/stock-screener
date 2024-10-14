// server.js
const express = require('express');
const cors = require('cors');
const stocksRouter = require('./routes/stocks');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes
app.use('/api/stocks', stocksRouter); // Use the stocks route

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});