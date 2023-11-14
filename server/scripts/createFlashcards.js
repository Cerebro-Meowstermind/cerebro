require('dotenv').config();

const OpenAI = require('openai').default;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ OPENAI_API_KEY });

async function getFlashcards(notes) {
  const prompt = `You are an AI that produces 10 flashcards based on study notes from the user. Each flashcard should have a term and definition property. Here are the notes: ${notes}`;

  const messages = [{ role: 'system', content: prompt }];

  const functions = [
    {
      name: 'createFlashcards',
      description: 'Create 10 flashcards for studying key topics',
      parameters: {
        type: 'object',
        properties: {
          flashcards: {
            type: 'array',
            description: 'Array with exactly 10 items.',
            items: {
              flashcard: {
                type: 'object',
                properties: {
                  definition: {
                    type: 'string',
                    description: 'Term definition topic derived from notes',
                  },
                  term: {
                    type: 'string',
                    description: 'Name of term from the definition property',
                  },
                },
                required: ['definition', 'term'],
              },
            },
            required: ['flashcard'],
          },
        },
        required: ['flashcards'],
      },
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      // model: 'gpt-4-1106-preview',
      messages: messages,
      functions: functions,
      function_call: { name: 'createFlashcards' },
    });

    // console.log(response);

    const message = response.choices[0].message;

    if (message.function_call) {
      const functionArguments = JSON.parse(message.function_call.arguments);

      if (functionArguments && functionArguments.flashcards) {
        const flashcardArray = functionArguments.flashcards;

        // console.log(flashcardArray);

        return flashcardArray;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = getFlashcards;
