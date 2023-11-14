const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { User } = require('../database/StudentModelv2.js');
const { StudySession } = require('../database/StudentModelv2.js');

const userControllers = {};

userControllers.login = (req, res, next) => {
  const { username, password } = req.body;
  User.find({ username: username, password: password })
    .exec()
    .then(data => {
      if (data.length === 0) {
        return res.status(201).json(false);
      }
      return next();
    })
    .catch(err => {
      return res.status(500).json({
        success: false,
        message: 'Error loging in.',
        error: err.message,
      });
    });
};

userControllers.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password, gradeLevel } =
      req.body;

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      gradeLevel,
    });

    return next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    });
  }
};

userControllers.createSession = async (req, res, next) => {
  try {
    const { sessionName, topic, mainPoints, painPoints, notes } = req.body;

    const session = await StudySession.create({
      sessionName,
      topic,
      mainPoints,
      painPoints,
      notes,
    });

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error creating session',
      error: error.message,
    });
  }
};

userControllers.getSessions = async (req, res, next) => {
  console.log('WORKING');

  try {
    const { userId } = req.params;

    const sessions = await StudySession.find({ userId: userId });

    if (!sessions || sessions.length === 0) {
      return res.status(404).send('Sessions not found');
    }

    res.locals.studySessions = sessions;

    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Service Error');
  }
};

module.exports = userControllers;
