const express = require('express');
const userControllers = require('./controllers/userControllers');
const apiControllers = require('./controllers/apiControllers');
const router = express.Router();

router.post('/login', userControllers.login, (req, res) => {
  res.status(200).json({
    message: 'Login Successful',
  });
});

router.post('/signup', userControllers.signup, (req, res) => {
  res.status(201).json({
    message: 'Signup Successful',
  });
});

router.post('/create', userControllers.createSession, (req, res) => {
  res.status(201).json({
    message: 'Created Mongo Session',
  });
});

router.post('/ask-question', apiControllers.askQuestion, (req, res) => {
  res.status(200).json(res.locals.studySession);
});

router.post('/flashcards', apiControllers.getFlashcards, (req, res) => {
  res.status(200).json(res.locals.askQuestion);
});

router.get('/getSessions/:_id', userControllers.getSessions, (req, res) => {
  res.status(200).json(res.locals.studySessions);
});

module.exports = router;
