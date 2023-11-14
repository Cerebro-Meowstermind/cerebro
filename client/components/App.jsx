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

export default App;
