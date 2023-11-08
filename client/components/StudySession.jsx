import React from "react";
import HeaderMenu from "./HeaderMenu.jsx";
import FooterMenu from "./FooterMenu.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudySession({username}) {
  const [inputText, setInputText] = useState('');

  const navigate = useNavigate();

  function saveSession() {
    // need to add fetch request to save session
    // then, navigate('/mainmenu')
  }

  return (
    <div className="studySession">
      <HeaderMenu username = {username} />
      <div className="chatView">
        <nav>
          <button className="orangeBtn">Start Session</button>
          <button className="orangeBtn" onClick={saveSession}>Save Session</button>
        </nav>
        <div className="chatArea">
          {messageList.map((message, index) => {
            return <Message message={message} key={index}></Message>;
          })}
        </div>
        <form className="chatUserInput">
          <input
            className="formInput" 
            name="topic"
            type="textarea" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required 
            placeholder="Chat with Grace">
          </input>
          <button className="orangeBtn" onClick={askQuestion}>Submit</button>
        </form>
      </div>
      <FooterMenu />
    </div>
  )

}

export default StudySession;