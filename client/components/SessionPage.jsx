import React from "react";
import HeaderMenu from "./HeaderMenu.jsx";
import FooterMenu from "./FooterMenu.jsx";
import { useState, useEffect, useRef } from "react";
import Message from "./Message.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SessionPage = ({username}) => {
  const [question, setQuestion] = useState('');
  const [messageList, updateMessageList] = useState([]);
  const [convoHistory, setConvoHistory] = useState([]); 
  const location = useLocation();
  const data = location.state;
  const scrollSpan= useRef();
  const navigate = useNavigate();

  useEffect(() => {
    scrollSpan.current.scrollIntoView({ behavior: "smooth" });
 }, [messageList]);

  function startSession() {
    fetch('/api/create-study-session', {
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
      })
      })
      .then(response => response.json())
      .then(data => {
        setConvoHistory(data.convoHistory);
        const newMessage = [...messageList];
        newMessage.push(data.chatbotMessage);
        updateMessageList(newMessage);
      })
      .catch(err => {
        console.error('Error creating session');
      })
  
  }

  function askQuestion(e) {
    e.preventDefault();
    let currentQuestion = question;
    setQuestion("Loading...");

    fetch('/api/ask-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        convoHistory,
        question: currentQuestion
      })
    })
    .then(response => response.json())
    .then(data => {
      setConvoHistory(data.convoHistory);
      const newMessage = [...messageList];
      newMessage.push(currentQuestion);
      newMessage.push(data.chatbotMessage);
      updateMessageList(newMessage);
      setQuestion('');
    })
  }
  
  function saveSession(e) {
    
  }

  return (
    <div className="studySession">
      <HeaderMenu username = {username} />
      <div className="chatView">
      <div className="chatHeader">
          <h1>Study Session</h1>
          <nav className="buttonNav">
            <button className="orangeBtn" onClick={startSession}>Start Session</button>
            <button className="orangeBtn" onClick={() => navigate('/mainmenu')}>Save Session</button>
          </nav>
        </div>
        <div className="chatArea">
          <div>
            {messageList.map((message, index) => {
              let color =  (index % 2 === 0) ? "white" : "#FFB703";
              return <Message message={message} key={index} color={color}></Message>;
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
            onChange={(e) => setQuestion(e.target.value)}
            required 
            placeholder="Chat with Grace">
          </textarea>
          <button className="orangeBtn" type="submit">Submit</button>
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
