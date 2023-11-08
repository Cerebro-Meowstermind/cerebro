import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import FrontPage from './FrontPage.jsx';
import CreateSession from './CreateSession.jsx';
import StudySession from './StudySession.jsx';
import InputPage from './InputPage.jsx';
import SessionPage from './SessionPage.jsx';
import ReviewStudySession from './ReviewStudySession.jsx';
import CreateFlashCards from './CreateFlashCards.jsx';
import ReviewFlashCards from './ReviewFlashCards.jsx';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mainmenu" element={<FrontPage />} />
        <Route path="/createsession" element={<CreateSession />} />
        <Route path="/studysession" element={<SessionPage />} />
        <Route path="/reviewstudysession" element={<ReviewStudySession />} />
        <Route path="/createflashcards" element={<CreateFlashCards />} />
        <Route path="/reviewflashcards" element={<ReviewFlashCards />} />
      </Routes>
    </div>
  );
};

// return <SignupPage />
// return <LoginPage />

// const [mode, updateMode] = useState("loginPage");
// const [title, updateTitle] = useState("");
// const [topic, updateTopic] = useState("");

// const titleChangeHandler = (e) => {
//   updateTitle(e.target.value);
//   console.log(e.target.value);
// };

//   const topicChangeHandler = (e) => {
//     updateTopic(e.target.value);
//   }

//   const createSession = () => {
//     updateMode("input");
//   };

//   const onCreate = (e) => {
//     e.preventDefault();
//     const sessionInfo = {};
//     sessionInfo.title = title;
//     sessionInfo.topic = topic;
//     console.log(sessionInfo);
//     updateMode("session");
//   };

//   if (mode === "loginPage") {
//     return <LoginPage createSession={createSession} />;
//   }

//   // if (mode === "frontPage") {
//   //   return <FrontPage createSession={createSession} />;
//   // }

//   if (mode === "input") {
//     return (
//       <InputPage
//         onCreate={onCreate}
//         title={title}
//         titleChangeHandler={titleChangeHandler}
//         topic={topic}
//         topicChangeHandler={topicChangeHandler}
//       />
//     );
//   }
//   if (mode === "session") {
//     return <SessionPage />;
//   }
// };

export default App;
