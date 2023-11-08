import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HeaderMenu from './HeaderMenu.jsx';
import FooterMenu from './FooterMenu.jsx';

const FrontPage = ({ username }) => {
  const navigate = useNavigate();

  return (
    <div className="mainMenu">
      <HeaderMenu username={username} />
      <section className="selectionMenu">
        <h1>What would you like to learn today?</h1>
        <div className="selectionButtons">
          <button
            className="gridItem"
            onClick={() => navigate('/createsession')}
            username={username}
          >
            CREATE STUDY SESSION
          </button>
          <button
            className="gridItem"
            onClick={() => navigate('/reviewstudysession')}
            username={username}
          >
            REVIEW STUDY SESSIONS
          </button>
          <button
            className="gridItem"
            onClick={() => navigate('/createflashcards')}
            username={username}
          >
            CREATE FLASH CARDS
          </button>
          <button
            className="gridItem"
            onClick={() => navigate('/reviewflashcards')}
            username={username}
          >
            STUDY FLASH CARDS
          </button>
        </div>
      </section>
      <FooterMenu />
    </div>
  );
};
export default FrontPage;
