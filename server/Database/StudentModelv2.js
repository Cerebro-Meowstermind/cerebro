const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.set('strictPopulate', false);
///////////// STUDENT USER SCHEMA /////////////
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gradeLevel: { type: String, required: true },
});

userSchema.virtual('studySessions', {
  ref: 'StudySession',
  localField: '_id',
  foreignField: 'userId', //userId
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

///////////// STUDY SESH SCHEMA /////////////
const studySessionSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionName: { type: String, required: true, unique: true },
  topic: { type: String, required: true },
  notes: { type: String, required: true },
  mainPoints: { type: String, required: true },
  painPoints: { type: String, required: true },
  conversationHistory: [{ message: String, timestamp: Date }],
});

const User = mongoose.model('User', userSchema);
const StudySession = mongoose.model('StudySession', studySessionSchema);

module.exports = { User, StudySession };
