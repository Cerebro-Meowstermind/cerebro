const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./routes.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const atlasUri =
  'mongodb+srv://teeringe:ifG2XBwUgwd5yMXU@cerebro.ktqbbqx.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(atlasUri)
  .then(() => {
    console.log('Connected to the Database!');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const DIST_DIR = path.join(__dirname, '../dist'); // Adjust this path to where your dist folder actually is.

app.use(express.static(DIST_DIR));

app.use(router);

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
