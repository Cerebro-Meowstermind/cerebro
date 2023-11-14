import React from 'react';
import HeaderMenu from './HeaderMenu.jsx';
import FooterMenu from './FooterMenu.jsx';
import { useState, useEffect, useRef } from 'react';
import Message from './Message.jsx';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const SessionPage = ({ username }) => {
  const [question, setQuestion] = useState('');
  const [messageList, updateMessageList] = useState([]);
  const [convoHistory, setConvoHistory] = useState([]);
  const location = useLocation();
  const data = location.state;
  const scrollSpan = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    scrollSpan.current.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  function startSession() {
    setIsLoading(true);

    fetch('/ask-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionName: data.sessionName,
        topic: data.topic,
        notes: data.notes,
        mainPoints: data.mainPoints,
        painPoints: data.painPoints,
        messages: [],
      }),
    })
      .then(response => response.json())
      .then(data => {
        const gptMessages = data.messages;
        setConvoHistory(gptMessages);
        updateMessageList(gptMessages.slice(2));
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error creating session');
      });
  }

  function askQuestion(e) {
    e.preventDefault();
    const sentMessages = convoHistory;
    sentMessages.push({ role: 'user', content: question });

    setQuestion('Loading...');

    fetch('/ask-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionName: data.sessionName,
        topic: data.topic,
        notes: data.notes,
        mainPoints: data.mainPoints,
        painPoints: data.painPoints,
        messages: convoHistory,
      }),
    })
      .then(response => response.json())
      .then(data => {
        const gptMessages = data.messages;
        setConvoHistory(gptMessages);
        updateMessageList(gptMessages.slice(2));
        setQuestion('');
      });
  }

  function saveSession(e) {}

  return (
    <div className="studySession">
      <HeaderMenu username={username} />
      <div className="chatView">
        <div className="chatHeader">
          <h1>STUDY SESSION</h1>
          <nav className="buttonNav">
            <button className="orangeBtn" onClick={startSession}>
              START SESSION
            </button>
            <button className="orangeBtn" onClick={() => navigate('/mainmenu')}>
              SAVE SESSION
            </button>
            <button
              className="orangeBtn"
              onClick={() =>
                navigate('/CreateFlashCards', { state: data.notes })
              }
            >
              FLASHCARDS
            </button>
          </nav>
        </div>
        <div className="chatArea">
          {isLoading && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}

          <div>
            {messageList.map((message, index) => {
              const color = index % 2 === 1 ? 'white' : '#FFB703';
              const person = index % 2 === 1 ? 'STUDENT' : 'GRACE';
              return (
                <Message
                  message={`${person}: ${message.content}`}
                  key={index}
                  color={color}
                ></Message>
              );
            })}
          </div>
          <span ref={scrollSpan}></span>
        </div>
        <form className="chatUserInput" onSubmit={askQuestion}>
          <textarea
            className="formInput"
            name="topic"
            type="textarea"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            required
            placeholder="Chat with Grace"
          ></textarea>
          <button className="orangeBtn" id="submitbtn" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
      <FooterMenu />
    </div>
  );
};

export default SessionPage;

// For Iteration Team: starting point for feature - saving session to database so users can retrieve past sessions and go over notes.
//   function saveSession() {
//   fetch('/api/save', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       sessionId, // need to have this state defined and updated when the session starts?
//       convoHistory
//     })
//   })
//   .then(response => {
//     if (response.ok) {
//       navigate('/mainmenu'); // Navigate to front page on successful save
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Handle response data
//   })
//   .catch(err => {
//     console.error('Error saving session:', err);
//   });
// }
