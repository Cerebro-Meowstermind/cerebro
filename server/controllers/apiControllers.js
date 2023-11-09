require('dotenv').config();
const askQuestion = require('../scripts/askQuestion');
const createFlashcards = require('../scripts/createFlashcards');
const questionPrompt = require('../scripts/questionPrompt');

const apiControllers = {};

apiControllers.askQuestion = async (req, res, next) => {
  const { sessionName, topic, notes, mainPoints, painPoints, messages } =
    req.body;

  if (messages.length === 0) {
    const prompt = questionPrompt(topic, notes, mainPoints, painPoints);
    messages.push({ role: 'system', content: prompt });
    messages.push({ role: 'user', content: 'Hello!' });
  }

  try {
    const gptResponse = await askQuestion(messages);
    messages.push(gptResponse);

    res.locals.studySession = {
      sessionName,
      topic,
      notes,
      mainPoints,
      painPoints,
      messages,
    };

    next();
  } catch (err) {
    return next({
      log: `An error occurred in apiControllers.askQuestion: ${err}`,
      status: 500,
      message: 'Error: An error Occurred',
    });
  }
};

apiControllers.getFlashcards = async (req, res, next) => {
  // flashcards
};

module.exports = apiControllers;
