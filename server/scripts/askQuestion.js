require('dotenv').config();

const OpenAI = require('openai').default;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ OPENAI_API_KEY });

async function askQuestion(messages) {
  try {
    const response = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo',
    });

    return response.choices[0].message;
  } catch (error) {
    console.error(error);
  }
}

module.exports = askQuestion;
