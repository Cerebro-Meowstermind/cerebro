const mongoose = require('mongoose');
const { User, StudySession } = require('./StudentModelv2');
const { MongoMemoryServer } = require('mongodb-memory-server');

//need to npm install jest, mongodb-memory-server

const mongoServer = new MongoMemoryServer();

const connect = async () => {
  await mongoServer.start()
	const mongoUri = mongoServer.getUri()
	try {
		await mongoose.connect(mongoUri, { useNewUrlParser: true }).then(() => console.log('Connected'))
	} catch (error) {
		console.error(error)
	}
}

const close = async () => {
	await mongoose.disconnect()
	await mongoServer.stop()
}

const clear = async () => {
	const collections = mongoose.connection.collections

	for (const key in collections) {
		await collections[key].deleteMany()
	}
}

beforeAll(async () => await connect())
beforeEach(async () => await clear())
afterAll(async () => await close())

describe('Create User', () => {
it('should save a valid user', async () => {
  const validUser = new User({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    gradeLevel: '10th',
  });

  const savedUser = await validUser.save();
  expect(savedUser._id).toBeDefined();
});

it('should require firstName, lastName, username, email, password, and gradeLevel', async () => {
  const user = new User({});
  let error;

  try {
    await user.validate();
  } catch (e) {
    error = e;
  }

  expect(error).toBeDefined();
});

it('should enforce the "username" field to be unique', async () => {
  const user1 = new User({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    gradeLevel: '10th',
  });

  const user2 = new User({
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'johndoe',
    email: 'jane@example.com',
    password: 'password456',
    gradeLevel: '11th',
  });

  await user1.save();

  let error;
  try {
    await user2.save();
  } catch (e) {
    error = e;
  }

  expect(error).toBeDefined();
  expect(error.message).toContain('username_1');
});
});

it('should save a valid session', async () => {
    const validSession = new StudySession({
        userId: '5dca1c7ce03643274c69527a', 
        sessionName: 'Session 1',
        topic: 'Math',
        notes: 'Study notes',
        mainPoints: 'Main points',
        painPoints: 'Pain points',
        conversationHistory: [],
    });
  
    const savedSession = await validSession.save();
    expect(savedSession._id).toBeDefined();
  });