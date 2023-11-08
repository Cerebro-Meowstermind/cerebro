const { User } = require('./Database/StudentModelv2.js');
const { StudySession } = require('./Database/StudentModelv2.js');

const controllers = {};

controllers.login = (req, res, next) => {
  const { username, password } = req.body;
  User.find({ username: username, password: password })
    .exec()
    .then(data => {
      console.log(data);
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

controllers.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password, gradeLevel } =
      req.body;
    console.log('Console log req.body:', req.body);
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      gradeLevel,
    });
    console.log('Console log req.body:', user);

    return next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    });
  }
};

controllers.createSession = async (req, res, next) => {
  try {
    const { sessionName, topic, mainPoints, painPoints, notes } = req.body;
    console.log('Console log req.body:', req.body);
    const session = await StudySession.create({
      sessionName,
      topic,
      mainPoints,
      painPoints,
      notes,
    });
    console.log('Console log session', session);

    return next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating session',
      error: error.message,
    });
  }
};

module.exports = controllers;
