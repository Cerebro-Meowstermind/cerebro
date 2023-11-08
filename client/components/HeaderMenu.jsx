import React from 'react';
import { Link } from 'react-router-dom';
import homepageLogo from '../images/logo_small.png';

function HeaderMenu({ username }) {
  return (
    <nav className="headerMenu">
      <img src={homepageLogo} />
      <ul>
        <li className="username">WELCOME{username}</li>
        <li>
          <Link to="/">LOGOUT</Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderMenu;
