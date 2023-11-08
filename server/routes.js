const express = require('express');
const controllers = require('./controllers');
const router = express.Router();

router.post('/login', controllers.login, (req, res) => {
  res.status(200).json({
    message: 'Login Successful',
  });
});

router.post('/signup', controllers.signup, (req, res) => {
  res.status(201).json({
    message: 'Signup Successful',
  });
});

router.post('/create', controllers.createSession, (req, res) => {
  res.status(201).json({
    message: 'Created Session',
  });
});

module.exports = router;
