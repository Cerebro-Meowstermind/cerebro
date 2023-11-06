const mongoose = require('mongoose');

///////////// STUDENT USER SCHEMA /////////////
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  gradeLevel: { type: String, required: true },
  studyPlans: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'StudyPlan' 
  }],
  // We can include references to sessions or embed them directly
  sessions: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Session' 
  }],
  // Do we need to add any other profile related information here?
}, { timestamps: true });


// Below is a pre-save hook to hash the password before saving
// 
const bcrypt = require('bcyrptjs');
studentSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

// collection name: 'student', assuming that's where we will be saving our users. 
const Student = mongoose.model('student', studentSchema);

/////////////// STUDY PLAN SCHEMA //////////////
const studySessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },
  subjects: [{
    name: String,
    // flash cards?
    topics: [String],
    resources: [{
      title: String,
      url: String
    }]
  }],
  goals: String,
  // Other fields relevant to the user's study plans
}, { timestamps: true });

const StudyPlan = mongoose.model('StudyPlan', studyPlanSchema);

////////// SESSION SCHEMA ///////////////
// the session could be quite detailed with info about the queries sent to OpenAI API, the responses received, or any additional notes / metadata about the study session.
const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },
  date: { type: Date, default: Date.now },
  notes: String,
  interactions: [{
    query: String,
    response: String,
    timestamp: { type: Date, default: Date.now }
  }],
  // We can store a summary or the entire content generated by OpenAI here
  contentGenerated: String,
  // Other session-specific data
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

/////////// NOTE/FLASHCARD SCHEMA /////////////////
// If the notes provided are complex and need to be accessed independently of sessions they might need their own schema. Otherwise, they could be a part of the session doc. 
const noteSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  text: String,
  // Any additional metadata, like categories or tags for the notes
  categories: [String],
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

/////////// EMBEDDINGS VS REFERENCING ///////////////
// If we're more worried about access speed right now, but not scale, we could embed (nest) the document. 
// Instead of referencing 'studyPlan' ID's in the studentSchema we can put the entire 'StudyPlan' document inside the studentSchema.
const userSchema = new mongoose.Schema({
  // ... other fields ...
  studyPlans: [{
    subjects: [{
      name: String,
      topics: [String],
      resources: [{
        title: String,
        url: String
      }]
    }],
    goals: String,
    // Embedded fields relevant to the user's study plans
  }],
  // ... other fields ...
}, { timestamps: true });

///////////  CHATBOT EMBEDDINGS //////////
// Do we want to adjust our schema to include conversation logs as embedded documents?
// We could design a conversation schema as an embedded document:
const conversationSchema = new mongoose.Schema({
  messages: [{
    text: String,
    fromUser: Boolean, // true if from the user, false if from the bot
    timestamp: { type: Date, default: Date.now }
  }],
  // ... additional metadata fields ...
});
// and then we embed this within our 'Session' schema:
// const sessionSchema = new mongoose.Schema({
//   // ... other fields ...
//   conversation: conversationSchema,
//   // ... other fields ...
// }, { timestamps: true });



module.exports = { Student, StudyPlan, Session, Note }