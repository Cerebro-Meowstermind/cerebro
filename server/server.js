const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./Database/UserController.js');
const sessionController = require('./Database/SessionController.js');
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
    console.log('Connected to the database!');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to the database');
});

const APIrequests = require('./OpenAI/APIrequests');

// app.use(express.static(path.join(__dirname, '../dist')));
// app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static(path.join(__dirname, '../src/images')));

// app.get('/', (req, res) => {
//   //console.log testing:
//   console.log('Received request from root');

//   res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
//   //console.log testing:
//   console.log('Response sent back to root');
// });

app.use('/api', APIrequests);

app.use('/user', userController);

app.use('/session', sessionController);

// app.use((err, req, res, next) => {
//   console.error('Error:', err.message);
//   console.error('Stack:', err.stack);
//   console.error('Path:', req.path);
//   console.error('Method:', req.method);
//   //console.log testing:
//   if (res.headersSent) {
//     return next(err);
//   }

//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: 'Internal Server Error',
//     error: {
//       message: err.message,
//       stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
//     },
//   });
// });

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
